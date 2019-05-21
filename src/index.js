// Create a global stack, event listener with callback function
window.eventHandlersByMessageId = {};
window.addEventListener('message', receiveMessage, false);

function receiveMessage(event) {
  event
    && event.data
    && event.data.responseToMessageId
    && eventHandlersByMessageId[event.data.responseToMessageId]
    && eventHandlersByMessageId[event.data.responseToMessageId](event);
}


/**
 * SmartMessenger
 *
 * @example
 *
 * const urlParams = new URLSearchParams(window.location.search);
 * const targetOrigin = urlParams.get('smart_messaging_origin') || '*';
 * const targetWindow = window.opener || window.parent;
 *
 * const messenger = new SmartMessenger(targetOrigin, targetWindow);
 * const payload = { resourceType: "Basic" };
 *
 * messenger.send('scratchpad.create', payload, (event) => {
 *  console.log(event);
 *  // ...
 * });
 *
 */
class SmartMessenger {
  constructor(targetOrigin, targetWindow) {
    this.targetOrigin = targetOrigin;
    this.targetWindow = targetWindow;
  }

  // Build message, postMessage and add to the eventHandler stack
  send(type, payload, eventHandler) {
    const message = this.buildMessage(type, payload);
    this.targetWindow.postMessage(message, targetOrigin);
    eventHandlersByMessageId[message.messageId] = eventHandler;
  }

  buildMessage(type, payload) {
    return {
      messageId: this.guid(),
      messageType: type,
      payload,
    };
  }

  // TODO: Use a proper UUID generator, this is just to keep the
  //       dependencies null
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  guid() {
    return `${this.s4() + this.s4()}-${
      this.s4()}-${this.s4()}-${
      this.s4()}-${this.s4()}${this.s4()}${this.s4()}`;
  }
}

module.exports = SmartMessenger;
