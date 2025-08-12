// Web Worker para tareas pesadas que no bloqueen el hilo principal
self.onmessage = e => {
  const { type, data } = e.data;

  switch (type) {
    case 'HEAVY_COMPUTATION': {
      // Ejemplo de tarea pesada
      const result = performHeavyTask(data);
      self.postMessage({ type: 'COMPUTATION_COMPLETE', result });
      break;
    }

    case 'PREFETCH_RESOURCES': {
      // Prefetch de recursos en background
      prefetchResources(data.urls);
      break;
    }

    default:
      console.log('Unknown task type:', type);
  }
};

function performHeavyTask(data) {
  // Simular trabajo pesado
  let result = 0;
  for (let i = 0; i < data.iterations; i++) {
    result += Math.random();
  }
  return result;
}

function prefetchResources(urls) {
  urls.forEach(url => {
    fetch(url, { mode: 'no-cors' })
      .then(() => console.log(`Prefetched: ${url}`))
      .catch(() => console.log(`Failed to prefetch: ${url}`));
  });
}
