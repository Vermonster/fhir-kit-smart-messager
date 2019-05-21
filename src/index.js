// Create a global stack, event listener with callback function
const eventHandlersByMessageId = {};

// Create a callback for the mesasge event.
function receiveMessage(event) {
  return event && event.data
    && event.data.responseToMessageId
    && eventHandlersByMessageId[event.data.responseToMessageId]
    && eventHandlersByMessageId[event.data.responseToMessageId](event);
}

// TODO: Use a proper UUID generator
/* eslint-disable no-bitwise, no-mixed-operators */
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0; const
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
/* eslint-enable no-bitwise, no-mixed-operators */

// Add the callback to an event listener
window.addEventListener('message', receiveMessage, false);

/**
 * SmartMessenger
 *
 * @example
 *
 * const urlParams = new URLSearchParams(window.location.search);
 * const targetOrigin = urlParams.get('smart_messaging_origin') || '*';
 * const targetWindow = window.opener || window.parent;
 *
 * const messenger = new SmartMessenger(targetWindow, targetOrigin);
 * const payload = { resourceType: "Basic" };
 *
 * messenger.send('scratchpad.create', payload, (event) => {
 *  console.log(event);
 *  // ...
 * });
 *
 */
class SmartMessenger {
  constructor(targetWindow, targetOrigin) {
    this.eventHandlersByMessageId = eventHandlersByMessageId;
    this.targetWindow = targetWindow;
    this.targetOrigin = targetOrigin;
  }

  // Build message, postMessage and add to the eventHandler stack
  send(type, payload, eventHandler) {
    const message = SmartMessenger.buildMessage(type, payload);

    this.targetWindow.postMessage(message, this.targetOrigin);
    eventHandlersByMessageId[message.messageId] = eventHandler;
  }

  static buildMessage(type, payload) {
    return {
      messageId: uuidv4(),
      messageType: type,
      payload,
    };
  }
}

export default SmartMessenger;
