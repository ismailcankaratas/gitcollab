import axios from "axios";
import { useState } from "react";
import { BsArrowUp } from 'react-icons/bs';
import Loading from "./Loading";
import TextareaAutosize from 'react-textarea-autosize';
import SocketIOClient from "socket.io-client";

const socket = SocketIOClient("http://localhost:3000", {
    path: "/api/socketio",
});

export default function ChatTextArea({ repoId }: {
    repoId: number
}) {
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const sendMessage = async () => {
        setIsLoading(true);
        try {
            await axios.post("/api/message/send", { text: message.trim(), repoId });
            setMessage("")
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false);
    }

    function onKeyDown(e: any) {
        if (e.keyCode == 13 && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
        if (e.keyCode == 13 && e.shiftKey) {
            setMessage(message + "\n")
            e.preventDefault();
        }
    }

    return (
        <div className="absolute bottom-0 w-full p-7 pr-12 bg-white">
            <div className="relative text-center">
                {message.length > 1800 && (
                    <span className={`text-sm text-red-600`}>
                        {message.length} / 2000
                    </span>
                )}
                <TextareaAutosize
                    placeholder="Send a message..."
                    className={`w-full max-h-[250px] focus:border-gc-secondary flex-wrap p-3 py-4 pr-9 rounded-lg border-2 overflow-auto outline-none border-[#c3c3c3] resize-none`}
                    value={message}
                    maxLength={2000}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => onKeyDown(e)}
                />

                <span className="absolute cursor-pointer right-3 bottom-4 bg-gc-secondary p-2 rounded-lg"
                    onClick={() => sendMessage()}>
                    {isLoading ? <Loading /> : <BsArrowUp color="white" />}
                </span>
            </div>
        </div>
    )
}