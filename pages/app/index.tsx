import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import AppLayout from "@/components/app/layout";
import { User } from "next-auth";

export default function App() {
    const router = useRouter();
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/")
        }
    })
    const [user, setUser] = useState<User | undefined>(undefined)

    useEffect(() => {
        async function getUser() {
            setUser(session?.user)
        }
        if (user === null) {
            getUser()
        }
        getUser()
    }, [session])
    return (
        <div className="container">
            <main>
                <h1 className="text-3xl font-bold underline">
                    Hello, Next.js!
                </h1>
                <button onClick={() => signOut()}>Çıkış yap</button>
                <pre>
                    {JSON.stringify(session, null, 2)}
                </pre>
            </main>
        </div>
    )
}
App.Layout = AppLayout;