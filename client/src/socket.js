import { io } from 'socket.io-client'
const socketAPI = io("http://localhost:3000");

export default socketAPI