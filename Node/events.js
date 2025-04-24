const EventEmiter = require('events');
const emitter = new EventEmiter();

emitter.emit("Message")
emitter.on("Message", () => {
    console.log("listener called")
} )