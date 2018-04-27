const events = require("events");
const emitter = new events.EventEmitter();

emitter.on("log", () => {
    console.log("trigger my first event!");
})

emitter.emit("log");
