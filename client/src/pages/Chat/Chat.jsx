import ChatLayout from "@/components/ChatLayout";
import React, { useContext, useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SocketContext } from '@/context/SocketContext';
import LeftChatBubble from "@/components/LeftChatBubble";
import RightChatBubble from "@/components/RightChatBubble";

export default function Chat() {
    const { onlineUsers, socket } = useContext(SocketContext);
    const [selectedUser, setSelectedUser] = useState(null);
    useEffect(() => {
        const firstOnlineUser = onlineUsers.find(user => user === socket.id);
        if (firstOnlineUser) {
            setSelectedUser(firstOnlineUser);
        }
    }, [onlineUsers, socket]);
    console.log(onlineUsers)
    console.log(socket)
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
                    <LeftChatBubble />
                    <RightChatBubble />
                </div>
                <div className="p-2 flex justify-between w-full items-center gap-2">
                    <input type="text" className="w-full p-2 border rounded-lg" />
                    <button className="p-2 text-white rounded-lg">Send</button>
                </div>
            </div>
        </ChatLayout>
    )
}