import AppLayout from "@/components/app/layout";
import ChatTextArea from "@/components/ui/ChatTextArea";
import Messages from "@/components/ui/Messages";
import { fetchRedis } from "@/helpers/redis";
import { useCollabFindRepo } from "@/hooks/CollabRepo/useCollabRepos";
import { Message } from "@/types/db";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export default function Chat() {
    const router = useRouter();
    const { username, reponame } = router.query;
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/");
        },
    });
    const [initialMessages, setInitialMessages] = useState<Message[]>([]);
    const { data, isLoading } = useCollabFindRepo(username, reponame);

    useEffect(() => {
        async function getChatMessages() {
            const results = await fetchRedis("zrange", `chat:${data.id}:messages`, 0, -1);
            const dbMessages = results.result?.map((message: any) => JSON.parse(message) as Message);
            const messages = dbMessages.reverse();

            setInitialMessages(messages);
        }
        getChatMessages();
    }, [data])
    return (
        <>
            {isLoading || status == "loading" ? "Loading..." : (
                <div className="w-full h-full relative">
                    <div className="w-full absolute top-0 text-xl font-bold pl-8 bg-[#fefefe] border border-[#c3c3c3] p-4 z-10">
                        <span>{data.full_name}</span>
                    </div>
                    <Messages initialMessages={initialMessages} sessionId={session.user?.id as string} />
                    <ChatTextArea repoId={data.id} />
                </div>
            )}
        </>
    )
}

Chat.Layout = AppLayout;
