import Head from 'next/head'

export default function Home({ clientId }: {
  clientId: string
}) {
  return (
    <>
      <Head>
        <title>Git Collab</title>
        <meta name="description" content="Üzerinde çalıştığınız depolar hakkında Github'a katkıda bulunanlarla kolayca sohbet edin!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <p>
          Üzerinde çalıştığınız depolar hakkında Github&apos;a katkıda bulunanlarla kolayca sohbet edin!
        </p>
        <a href={`https://github.com/login/oauth/authorize?client_id=${clientId}`}>
          Github Login
        </a>
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  return {
    props: {
      clientId: process.env.GITHUB_CLIENT_ID,
    },
  };
};