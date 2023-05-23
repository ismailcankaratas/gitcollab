import { fetchRedis } from "@/helpers/redis";
import { db } from "@/lib/db";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { NextApiResponseServerIO } from "@/types/next";
import { Message, User } from "@/types/db";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
    if (req.method === 'POST') {
        try {
            const { text, repoId } = req.body;
            const session = await getSession({ req });
            if (!session) res.status(401).send({ message: "Unauthorized" });

            const rawSender = await fetchRedis("get", `user:id:${session?.user.id}`);
            const sender = JSON.parse(rawSender.result) as User;

            const timestamp = Date.now();

            const message: Message = {
                id: nanoid(),
                user: sender,
                senderId: sender.id,
                repoId,
                text,
                timestamp,
            };

            await db.zadd(`chat:${repoId}:messages`, {
                score: timestamp,
                member: JSON.stringify(message),
            });

            res?.socket?.server?.io?.emit("chat message", message);

            return res.status(200).send({ message: "Message sent" });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server error" });
        }

    }
}
