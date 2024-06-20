import ChatLayout from "@/components/ChatLayout";

export default function Chat() {
    return (
        <ChatLayout>
            <div className="flex-col w-1/4 p-2">
                ONLINE USER
            </div>
            <div className="flex flex-col w-3/4 p-2">
                <div className="w-full h-20 flex p-4 justify-between items-center border-b">
                    <div className="flex items-center gap-2">
                        AVATAR
                    </div>
                </div>
                <div className="w-full overflow-y-auto overflow-x-hidden flex-grow flex flex-col">
                    CHAT BUBBLE
                </div>
                <div className="p-2 flex justify-between w-full items-center gap-2">
                    <input type="text" className="w-full p-2 border rounded-lg" />
                    <button className="p-2 text-white rounded-lg">Send</button>
                </div>
            </div>
        </ChatLayout>
    )
}