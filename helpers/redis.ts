import axios from "axios";

const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL;
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN;

type Command = "zrange" | "sismember" | "get" | "smembers";

export async function fetchRedis(
    command: Command,
    ...args: (string | number)[]
) {
    const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join("/")}`;
    
    const response = await axios.get(commandUrl,{
        headers:{
            Authorization: `Bearer ${authToken}`,
        },
    });

    if(!response.status) {
        throw new Error(`Error executing Redis command: ${response.statusText}`);
    }
    return response.data;
}