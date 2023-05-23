import { AppProps } from "next/app";
import Sidebar from "./Sidebar/Sidebar";

export default function AppLayout({ children }: AppProps & { children: any }) {
    return (
        <div className="flex w-full h-[100vh] overflow-hidden">
            <Sidebar />
            <main className="w-full lg:ml-[300px] bg-[#fefefe] rounded-2xl m-4 text-black overflow-y-auto">
                {children}
            </main>
        </div>
    )
}