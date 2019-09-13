# FHIRKit SMART Messenger

SMART Messaging implementation for the browser.

## Usage

```javascript
// Some setup
const urlParams = new URLSearchParams(window.location.search);
const targetOrigin = urlParams.get('smart_messaging_origin') || '*';
const targetWindow = window.opener || window.parent;

const payload = { resourceType: "Basic" };

// Create a messenger object and call send with a callback
const messenger = new SmartMessenger(targetWindow, targetOrigin);

messenger.send('scratchpad.create', payload, (event) => {
  console.log(event);
  // ...
});
```

## Background

https://github.com/smart-on-fhir/smart-web-messaging

## Requirements

Works in IE10+, modern Chrome, Safari, Firefox.

## Development

Clone the repo and then

```
% yarn install
% yarn build --watch
% yarn start
```

Then open `http://localhost:3000` in your browser.
