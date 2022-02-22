const io = require("socket.io")(9999, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

//active users:
let activeUsers = [];

io.on("connection", (socket) => {
  console.log("newUser");
  console.log(socket.id);
  /////////////////////////////////
  //handle logging user in
  socket.on("user-login", (data) => {
    const newUser = {
      id: socket.id,
      publicKey: data.publicKey,
      username: data.username,
    };
    activeUsers.push(newUser);
    //inform all users that new user has joined ('io' sends to all clients)
    io.emit("users-list-updated", activeUsers);
  });

  /////////////////////////////
  //pass message from sender to receiver
  socket.on("message", (data) => {
    socket.to(data.to).emit("message", data);
  });

  /////////////////////////////
  //on logout/disconnect- cleanup
  socket.on("disconnect", () => {
    console.log("$$$$$$$ USER LEFT");

    activeUsers = activeUsers.filter((user) => user.id !== socket.id);

    //inform all users that one user has left
    io.emit("users-list-updated", activeUsers);
  });
});
