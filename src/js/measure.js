export function measure(name) {
  const startTime = performance.now();

  return {
    finish: () => {
      const duration = performance.now() - startTime;
      console.log(`${name}: ${duration}ms`);
    },
  };
}

export function runAfterFramePaint(callback) {
  // Queue a "before Render Steps" callback via requestAnimationFrame.
  requestAnimationFrame(() => {
    const messageChannel = new MessageChannel();

    // Setup the callback to run in a Task
    messageChannel.port1.onmessage = callback;

    // Queue the Task on the Task Queue
    messageChannel.port2.postMessage(undefined);
  });
}
