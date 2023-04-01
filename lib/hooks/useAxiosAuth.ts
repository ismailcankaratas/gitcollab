import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import axiosAuth from '@/lib/axios';

const useAxiosAuth = () => {
    const { data: session } = useSession();

    useEffect(() => {
        const requestInterceptor = axiosAuth.interceptors.request.use((config: any) => {
            if(!config.headers.Authorization) {
                config.headers['Authorization'] = `Bearer ${session?.user?.github_access_token}`;
            }
            return config;
        });

        return () => {
            axiosAuth.interceptors.request.eject(requestInterceptor);
        }

    }, [session]);

    return axiosAuth;
}

export default useAxiosAuth;