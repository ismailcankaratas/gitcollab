import { getServerSession } from "next-auth/next"
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

interface IResponse extends NextApiResponse {
    status: any;
}

const handler = async (req: NextApiRequest, res: IResponse) => {
    axios.defaults.headers.common['Accept'] = 'application/json';

    const session = await getServerSession(req, res, authOptions)

    if (!session) {
        return res.status(401).json({ message: "You must be logged in." });
    }

    const { data } = await axios.get(`${session?.user?.repos_url}?type=all&sort=updated`, {
        headers: {
            Authorization: `Bearer ${session?.user?.github_access_token}`
        }
    });

    const contributedRepos = data.filter((repo: any) => repo.size > 0 && repo.fork !== true);
    let repos: any = [];

    for (let i = 0; i < contributedRepos.length; i++) {
        const element = contributedRepos[i];
        const contributors = await axios.get(`${element.contributors_url}`, {
            headers: {
                Authorization: `Bearer ${session?.user?.github_access_token}`
            }
        })
        if (contributors.data.length > 1) {
            repos.push(element);
        }
    }
    return res.status(200).json(repos);

}

export default handler;