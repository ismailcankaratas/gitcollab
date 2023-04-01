import axios from 'axios';

export const getAccessToken = async (code: string) => {
    axios.defaults.headers.common['Accept'] = 'application/json';
    try {
        const url = "https://github.com/login/oauth/access_token";
        const params = {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
        };

        const { data } = await axios.post(url, params);

        return data.access_token;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const getGithubUser = async (access_token: string) => {
    axios.defaults.headers.common['Accept'] = 'application/json';
    try {
        const url = "https://api.github.com/user";

        const { data } = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}
