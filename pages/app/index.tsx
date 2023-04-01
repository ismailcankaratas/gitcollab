import { getSession, signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function App() {
    const router = useRouter();
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/")
        }
    })
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function getUser() {
            setUser(user)
        }
        if (user === null) {
            getUser()
        }
        getUser()
    }, [session])
    return (
        <div className="container">
            <main>
                <h1 className="title">
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                    <button onClick={() => signOut()}>Çıkış yap</button>
                </h1>
                <pre>
                    {JSON.stringify(session, null, 2)}
                </pre>
            </main>
        </div>
    )
}