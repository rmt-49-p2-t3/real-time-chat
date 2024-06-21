export default function LeftChatBubble(props) {
    return (
        <div className="flex-col w-1/4 p-2">
            <div className="chat chat-start">
                <div className="chat-bubble">{props.messages}</div>
            </div>
        </div>
    )
}