import { Button } from '@/components/button'
import { RightIcon } from '@/components/rightIcon'
import { BlueBackground, LogoContainer, PageContainer } from '@/styles/pages'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Logo from '../assets/images/circle-logo.png'

export default function Home() {
    const router = useRouter()
    return (
        <>
            <Head>
                <title>PeerFound</title>
            </Head>
            <PageContainer>
                <BlueBackground />

                <LogoContainer>
                    <Image src={Logo} alt="PeerFound logo" />
                </LogoContainer>
                <h1>PeerFound</h1>
                <h2>Sua nova forma de realizar emprestimos</h2>
                <Button onClick={() => router.push('/login')}>
                    Entrar <RightIcon />
                </Button>
            </PageContainer>
        </>
    )
}
