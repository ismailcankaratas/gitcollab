import axios from "@/lib/axios";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getCsrfToken } from "next-auth/react"
import { useRouter } from "next/router";
import { useEffect } from "react"

export default function Login({ csrfToken, code }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();

    useEffect(() => {
        async function fetchUser() {
            const res = await axios.post('/api/auth/callback/credentials', {
                code,
                csrfToken
            });
            if (res.status === 200) {
                router.push("/app");
            }
        }
        fetchUser()
    }, [csrfToken, code])
    return (
        <div>

        </div>
    )
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
            code: context.query.code
        },
    }
}