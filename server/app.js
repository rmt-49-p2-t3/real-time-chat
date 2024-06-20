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
let onlineUsers = [];
io.on('connection', async (socket) => {
    console.log(`New client connected with id ${socket.id}`);
    GetController.setIo(io);
    onlineUsers.push(socket.id);

    // Emit the 'onlineUsers' event with the list of online users
    io.emit('onlineUsers', onlineUsers);

    // Fetch users and emit 'user' event
    const users = await GetController.fetchUsers();
    io.emit('user', users);

    socket.on('disconnect', () => {
        console.log(`Client with id ${socket.id} disconnected`);

        // Remove the disconnected user from the onlineUsers array
        onlineUsers = onlineUsers.filter(id => id !== socket.id);

        // Emit the 'onlineUsers' event with the updated list of online users
        io.emit('onlineUsers', onlineUsers);
    });
});

httpServer.listen(port);
