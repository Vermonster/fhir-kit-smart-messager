window.addEventListener("message", receiveMessage, false);

let childWindow = null;

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function receiveMessage(event) {
  console.log(event);

  // Print out the event data
  document.getElementById('response').value = JSON.stringify(event.data, null, 2);

  // Send payload back to smart app
  const payload = {
    messageId: uuidv4(),
    responseToMessageId: event.data.messageId,
    payload: {
      status: 200,
      location: 'https://resource-location',
      outcome: 'Success'
    }
  };

  childWindow.postMessage(payload, '*');
}

function openSmartApp(event) {
  event.preventDefault();
  childWindow = window.open('/smart', '_blank', 'height=600,width=600');
}
