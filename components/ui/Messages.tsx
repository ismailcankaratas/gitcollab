import { Message } from "@/types/db";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import SocketIOClient from "socket.io-client";

interface MessagesProps {
    initialMessages: Message[];
    sessionId: string;
}

const Messages: FC<MessagesProps> = ({
    initialMessages,
    sessionId
}) => {
    const scrollDownRef = useRef<HTMLDivElement | null>(null);
    const [messages, setMessages] = useState<any>([]);

    useEffect(() => {
        async function getMessages() {
            setMessages(initialMessages);
        }
        getMessages()
    }, [initialMessages]);

    useEffect(() => {
        const socket = SocketIOClient("http://localhost:3000", {
            path: "/api/socketio",
        });

        // log socket connection
        socket.on("connect", () => {
            // update chat on new message dispatched
            socket.on("chat message", async (message: any) => {
                setMessages((messages: any) => [message, ...messages]);
            });
        });

        // Component temizlendiğinde soketi kapat
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="flex h-full flex-1 flex-col-reverse gap-8 p-8 pt-24 pb-28 overflow-y-auto">
            <div ref={scrollDownRef} />
            {messages.length == 0 ? "Message notfound." :
                messages.map((message: any, index: any) => {
                    const isCurrentUser = message.senderId == Number(sessionId);
                    const hasNextMessageFromSameUser = initialMessages[index - 1]?.senderId === message.senderId;
                    return (
                        <div key={`${message.id}-${message.timestamp}`} className="w-full relative">
                            <div className={`p-4 flex border-2 border-[#f3f5f7] rounded-xl font-semibold text-sm pb-8
                            ${isCurrentUser ? "bg-white" : "bg-[#f3f5f7]"}`}>
                                {message.text}
                            </div>
                            <div className={`text-xs text-[#c3c3c3] font-semibold
                            ${isCurrentUser ? "text-left" : "text-right"}`}>
                                <ReactTimeAgo date={message.timestamp} locale="en-US" />
                            </div>
                            <div className={`absolute bottom-[-.9rem]
                            ${isCurrentUser ? "right-4" : "left-4"}`}>
                                <Image
                                    className="rounded-xl"
                                    width={50} height={50} alt={message.user.login} src={message.user.avatar_url} />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Messages;