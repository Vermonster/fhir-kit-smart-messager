const urlParams = new URLSearchParams(window.location.search);
const targetOrigin = urlParams.get('smart_messaging_origin') || '*';
const targetWindow = window.opener || window.parent;

const messenger = new SmartMessenger(targetWindow, targetOrigin);

function sendSmartMessage() {
  const payload = JSON.parse(document.getElementById('payload').value || "{}");
  messenger.send('scratchpad.create', payload, (event) => {
    console.log(event);
    document.getElementById('response').value = JSON.stringify(event.data, null, 2);
  });
}
