import axios from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from "react";

const fetchCollabRepos = (): Promise<any> =>
    axios.get(`/api/github/contributedRepos`).then((response) => response.data)

const useCollabRepos = () => {
    return useQuery(["collabRepos"], () => fetchCollabRepos());
}

const useCollabFindRepo = (repoUsername: any, repoName: any) => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const repos = useCollabRepos();
    const repoFullName = `${repoUsername}/${repoName}`;
    useEffect(() => {
        function getRepo() {
            setData(repos.data?.find((x: any) => x.full_name == repoFullName))
            setIsLoading(false)
        }
        if (!repos.isLoading) {
            getRepo()
        }
    }, [repos.data, repos.isLoading, repoUsername, repoName])
    return {
        data,
        isLoading
    }
};


export { useCollabRepos, useCollabFindRepo }