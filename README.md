# FHIRKit SMART Messaging

SMART Messaging implementation for the browser.

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

## Implementation

Example implementation:

* https://github.com/Vermonster/fhir-kit-client/pull/100
* https://gist.github.com/bkaney/d5acd2b13ed3cc43ccce68a88fcc6c93


Also consider this fallback polyfill for addEventListener.:

```
// The standard method is `addEventListener`, there is a
// fallback to use `attachEvent`
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];

// The standard event is `message`, fallback is `onmessage`
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

// Setup the listener with a callback
eventer(messageEvent, function(event) {
  // The standard key is `data`, fallback to `message`
  var key = event.data ? "data" : "message";
  var smartData = event[key];

  // Implementation...

}, false);
```
