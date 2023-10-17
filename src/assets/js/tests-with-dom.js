async function runAfterFramePaint(callback) {
  // Queue a "before Render Steps" callback via requestAnimationFrame.
  requestAnimationFrame(() => {
    const messageChannel = new MessageChannel();

    // Setup the callback to run in a Task
    messageChannel.port1.onmessage = callback;

    // Queue the Task on the Task Queue
    messageChannel.port2.postMessage(undefined);
  });
}

currentTime = performance.timeOrigin + performance.now();

// document.body.innerHTML = stringDom;

runAfterFramePaint(() => {
  afterTime = performance.timeOrigin + performance.now();
  console.log("mostrar na tela: ", afterTime - currentTime);
});
