import io from "socket.io-client";

let socket;

export const initiateSocket = (name) => {
  socket = io("http://localhost:4050");
  console.log(`Connecting socket...`);

  if (socket && name) {
    socket.emit("on-name-enter", name);
    return socket;
  }
};

export const sendMessage = (message) => {
  socket.emit("message", message);
};
