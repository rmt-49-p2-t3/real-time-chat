import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [user, setUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [onlineUsersEmails, setOnlineUsersEmails] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            return;
        }

        const newSocket = io('http://localhost:3000', {
            query: { token }
        });

        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to server');
            newSocket.emit('requestUserData');
        });

        newSocket.on('user', data => {
            setUser(data);
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        newSocket.on('onlineUsers', users => {
            console.log('Received onlineUsers event', users);
            setOnlineUsers(users);

            const newOnlineUsersEmails = { ...onlineUsersEmails };
            users.forEach((onlineUser) => {
                if (onlineUser.id === user.id) {
                    newOnlineUsersEmails[onlineUser.id] = user.email;
                }
            });
            setOnlineUsersEmails(newOnlineUsersEmails);
        });

        return () => newSocket.close();
    }, []);

    return (
        <SocketContext.Provider value={{ socket, user, onlineUsers, onlineUsersEmails }}>
            {children}
        </SocketContext.Provider>
    );
};