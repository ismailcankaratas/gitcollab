import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Logout() {
    const { data: session, status } = useSession();
    return (
        <div className="mt-auto w-full flex flex-col gap-4 bg-[#232627] p-4 rounded-2xl">
            {status == "loading" ? "Loading..." : (
                <>
                    <div className="flex gap-3">
                        <div>
                            <Image
                                width={50}
                                height={50}
                                src={session?.user?.avatar_url || ""}
                                alt={session?.user?.login || ""}
                                className="rounded-full" />
                        </div>
                        <div className="text-left">
                            <div className="font-bold">
                                {session?.user?.name}
                            </div>
                            <div className="text-sm text-[#878788]">
                                @{session?.user?.login}
                            </div>
                        </div>
                    </div>
                    <div
                        className="py-2.5 hover:bg-red-700 hover:border-red-700 gap-4 flex justify-center items-center rounded-xl px-4 duration-300 cursor-pointer border border-[#5a5a5c]"
                        onClick={() => signOut()}
                    >
                        {/* <i className="bi bi-box-arrow-in-right"></i> */}
                        <span className="text-[15px] font-bold">
                            Logout
                        </span>
                    </div>
                </>
            )}
        </div>
    )
}