import ChatLayout from "@/components/ChatLayout";
import React, { useContext, useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SocketContext } from '@/context/SocketContext';
import LeftChatBubble from "@/components/LeftChatBubble";
import RightChatBubble from "@/components/RightChatBubble";
import socketAPI from "@/socket";

export default function Chat() {
    const { onlineUsers, socket } = useContext(SocketContext);
    const [users, setUsers] = useState([])
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([])

    const [selectedUser, setSelectedUser] = useState(null);
    useEffect(() => {
        const firstOnlineUser = onlineUsers.find(user => user === socket.id);
        if (firstOnlineUser) {
            setSelectedUser(firstOnlineUser);
        }
    }, [onlineUsers, socket]);

    useEffect(() => {
        socketAPI.auth = {
            access_token: localStorage.access_token
        }
        socketAPI.disconnect().connect()
    }, []);

    useEffect(() => {
        socketAPI.on("users:online", (newUsers) => {
            setUsers(newUsers);
        });

        socketAPI.on("messages:info", (message) => {
            setMessages((prevMessages) => {
                return [...prevMessages, message]
            });
        });

        return () => {
            socketAPI.off("users:online")
            socketAPI.off("messages:info")
        }
    }, []);

    const handleSend = (e) => {
        e.preventDefault();
        if (newMessage.trim() !== "") {
            socketAPI.emit("message:new", {
                from: localStorage.access_token,
                message: newMessage
            });
            setMessages((prevMessages) => [
                ...prevMessages,
                { from: localStorage.access_token, message: newMessage }
            ]);
            setNewMessage("");
        }
    };
    return (
        <ChatLayout>
            <div className="flex-col w-1/4 p-2">

                {onlineUsers.filter(user => user === socket.id).map(onlineUser => (
                    <div className="flex-col" onClick={() => setSelectedUser(onlineUser)}>
                        <Avatar className="m-4 " key={onlineUser.id} online={true}>
                            <AvatarImage src={onlineUser.avatarUrl} />
                            <AvatarFallback>{onlineUser.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </div>
                ))}

            </div>
            <div className="flex flex-col w-3/4 p-2">
                <div className="w-full h-20 flex p-4 justify-between items-center border-b">
                    <div className="flex items-center w-full gap-2">
                        {selectedUser ? (
                            <Avatar>
                                <AvatarImage src={selectedUser.avatarUrl} />
                                <AvatarFallback>{selectedUser.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        ) : 'AVATAR'}
                    </div>
                </div>
                <div className="w-full p-6 overflow-y-auto overflow-x-hidden flex-grow flex flex-col">
                    {messages.map((el) => {
                        return el.from !== localStorage.access_token ?
                            (<LeftChatBubble
                                messages={el.message} />)
                            :
                            (<RightChatBubble messages={el.message} />)
                    })}
                </div>
                <div className="p-2 flex-col justify-between w-full items-center gap-2">
                    <form onSubmit={handleSend}>
                        <input type="text" className="w-4/5 p-2 border rounded-lg" onChange={(e) => setNewMessage(e.target.value)}
                            value={newMessage} />
                        <button className="p-2 w-1/5 text-white rounded-lg">Send</button>
                    </form>
                </div>
            </div>
        </ChatLayout>
    )
}