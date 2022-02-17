const Websocket = require("ws");
const wss = new Websocket.Server(
  {
    port: 9876,
  },
  () => {
    console.log("ws working");
  }
);
wss.on("connection", (ws) => {
  console.log("user connected");
  ws.send("hello from server");
  ws.on("message", (data) => {
    console.log(data.toString());
  });
});
