export default function RightChatBubble(props) {
    return (
        <div className="chat chat-end">
            <div className="chat-bubble">{props.messages}</div>
        </div>
    )
}