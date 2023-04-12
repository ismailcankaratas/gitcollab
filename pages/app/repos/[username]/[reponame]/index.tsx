import AppLayout from "@/components/app/layout";
import { useCollabFindRepo } from "@/hooks/CollabRepo/useCollabRepos";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export default function Chat() {
    const router = useRouter();
    const { username, reponame } = router.query;
    const { data, isLoading } = useCollabFindRepo(username, reponame);
    console.log(data, isLoading);
    return (
        <>
            <h1 className="text-3xl font-bold underline">
                {username}
                /
                {reponame}
            </h1>

            {isLoading ? "Loading..." : (
                <>
                    <pre>
                        {JSON.stringify(data, null, 4)}
                    </pre>
                </>
            )}
        </>
    )
}

Chat.Layout = AppLayout;
