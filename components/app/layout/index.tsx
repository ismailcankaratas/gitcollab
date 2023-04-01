import { AppProps } from "next/app";

export default function AppLayout({ children }: AppProps & { children: any }) {
    return (
        <div>
            <h1>App Layout</h1>
            {children}
        </div>
    )
}