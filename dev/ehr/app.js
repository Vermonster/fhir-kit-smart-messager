window.addEventListener("message", receiveMessage, false);

let childWindow = null;

function receiveMessage(event) {
  console.log(event);

  const payload = {
    responseToMessageId: event.data.messageId
  };
  childWindow.postMessage(payload, '*');
}

function openSmartApp(event) {
  event.preventDefault();
  childWindow = window.open('/smart', '_blank', 'height=600,width=600');
}
