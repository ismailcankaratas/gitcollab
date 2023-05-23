import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "@/types/next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
;
export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (res.socket.server.io) {
        console.log('Socket is already running.')
    } else {
        console.log('Socket is initializing...')

        const httpServer: NetServer = res.socket.server as any;
        const io = new ServerIO(httpServer, {
            path: "/api/socketio",
        });
        // append SocketIO server to Next.js socket server response
        res.socket.server.io = io;
    }

    res.end()
}