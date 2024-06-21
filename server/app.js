if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const errorHandlers = require('../server/middlewares/ErrorHandler');
const { createServer } = require("http");
const { Server } = require("socket.io");

const GetController = require('./controllers/GetController');


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(require(`../server/routes`))
app.use(errorHandlers);

const httpServer = createServer(app);
const io = require('socket.io')(httpServer, {
    cors: {
        origin: "*",  // Allow all origins
        methods: ["GET", "POST"]
    }
});
let users = []
let onlineUsers = []

io.on("connection", async (socket) => {
    console.log('New User connected');
    console.log(socket);
    console.log("access_token: ", socket.handshake.auth.access_token);
    GetController.setIo(io);
    onlineUsers.push(socket.id);
    io.emit('onlineUsers', onlineUsers);

    // Fetch users and emit 'user' event
    const userOn = await GetController.fetchUsers();
    io.emit('user', users);
    if (socket.handshake.auth.access_token) {
        users.push({
            id: socket.id,
            access_token: socket.handshake.auth.access_token
        });
        socket.broadcast.emit("users:online", users)
    }
    socket.emit("message", "Welcome to the socket server" + socket.id)


    socket.on("count:update", (newCount) => {
        console.log({ newCount });
        socket.broadcast.emit("count:info", newCount)

    });

    socket.on("message:new", (newMessage) => {
        socket.broadcast.emit("messages:info", newMessage)
    });

    socket.on("disconnect", () => {
        users = users.filter(item => item.id !== socket.id)
        socket.broadcast.emit("users:online", users)
    });
});

httpServer.listen(port);
