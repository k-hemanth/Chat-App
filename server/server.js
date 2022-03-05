const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const users = require("./users");

const port = 4050;
const app = express();
const httpServer = createServer(app);

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

var sockets = {};
const io = new Server(httpServer, {
  cookie: false,
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
  allowEIO3: true,
});

io.on("connection", function (socket) {
  socket.on("on-name-enter", (e) => {
    if (!e) return;
    socket.userName = e;
    // console.log(socket)
    if (sockets[e]) {
      sockets[e].push(socket);
    } else {
      sockets[e] = [socket];
    }
  });

  socket.on("message", (e) => {
    console.log(e);
    // console.log(socket);
    let targetId = e.to;
    let sourceId = e.from;
    console.log(targetId, sourceId);
    // console.log(sockets);
    if (targetId && sockets[targetId]) {
      sockets[targetId].forEach((cli) => {
        cli.emit("message", e);
      });
    }

    if (sourceId && sockets[sourceId]) {
      sockets[sourceId].forEach((cli) => {
        cli.emit("message", e);
      });
    }
  });

  socket.on("disconnect", function () {
    if (!socket.user_id || !sockets[socket.user_id]) {
      return;
    }
    let targetSockets = sockets[socket.user_id];
    for (let i = 0; i < targetSockets.length; ++i) {
      if (targetSockets[i] == socket) {
        targetSockets.splice(i, 1);
      }
    }
  });
});

app.get("/login", (req, res) => {
  let name = req.query.name;
  let usersList = users.filter((u) => u.name !== name);
  res.send({ listOfUsers: usersList, name });
});

httpServer.listen(port, () => console.log(`Listening on port ${port}`));
