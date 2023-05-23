import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link';

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <>
      <Head>
        <title>Git Collab</title>
        <meta name="description" content="Üzerinde çalıştığınız depolar hakkında Github'a katkıda bulunanlarla kolayca sohbet edin!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <p>
          Üzerinde çalıştığınız depolar hakkında Github&apos;a katkıda bulunanlarla kolayca sohbet edin!
        </p>
        {status == "loading" ? ("loading...") :
          (!session ? (
            <a href={`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`}>
              Github ile giriş yap
            </a>
          ) : (
            <Link href={"/app"}>
              Github ile Devam et
            </Link>
          ))
        }
      </div>
    </>
  )
}