import { db } from "@/lib/db";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
    if (req.method == "POST") {
        const { id } = req.body;
        const user = await db.get(`user:id:${id}`);
        return res.status(200).json(user);
    }
}

export default handler;