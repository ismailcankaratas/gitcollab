import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import AppLayout from "@/components/app/layout";
import { useCollabRepos } from "@/hooks/CollabRepo/useCollabRepos";

export default function App() {
    const router = useRouter();
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/")
        }
    })
    const repos = useCollabRepos();
    return (
        <>
            <h1 className="text-3xl font-bold underline">
                Git Collab
            </h1>
            <div>
                {repos.isLoading ? "Loading..." :
                    repos.data.length > 0 ? (
                        <>
                            <span>
                                Katkıda bulunduğun <strong>{repos.data.length}</strong> repo listelendi.
                            </span>
                            <div className="flex gap-4 mt-4 justify-around">
                                {repos.data.map((repo: any) => (
                                    <div key={repo.id} className="bg-gc-secondary p-4 text-white rounded-lg">
                                        {repo.name}
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : "Katkıda bulunduğun repo yok."}
            </div>
        </>
    )
}

App.Layout = AppLayout;