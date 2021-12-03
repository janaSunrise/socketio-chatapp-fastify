const fastify = require("fastify")({ logger: true });
let io = require("socket.io")(fastify.server);

// App constants
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;
const template_prefix = "/templates";

// Templating
fastify.register(require("point-of-view"), {
  engine: {
    ejs: require("ejs"),
  },
});

// Routing
fastify.get("/", async (req, res) => {
  return res.view(`${template_prefix}/index.html`);
});

io.on("connection", (socket) => {
  socket.on("chat-message", (msg) => {
    socket.broadcast.emit("chat-message", msg);
  });

  socket.on("joined", (name) => {
    socket.broadcast.emit("joined", name);
  });

  socket.on("leaved", (name) => {
    socket.broadcast.emit("leaved", name);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
  socket.on("stoptyping", () => {
    socket.broadcast.emit("stoptyping");
  });
});

// Run the server
fastify.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
