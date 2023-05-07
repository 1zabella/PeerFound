import { Button } from '@/components/button'
import { RightIcon } from '@/components/rightIcon'
import { PageContainer2, BlackBackground2 } from '@/styles/pages'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Welcome from '../../assets/images/welcome.png'
import { BackIcon2 } from '@/components/backIcon'
import { useState } from 'react'
import Header2 from '@/components/header2'

export default function Home() {
    const [stage, setStage] = useState(0)
    const router = useRouter()

    const backHandler = () => {
        if (stage == 0) {
            router.replace("/")
        } else if (stage == 1) {
            setStage(0)
        }
    }

    return (
        <>
            <PageContainer2>

                <Header2 />
                <BackIcon2 onClick={backHandler} />
             
                    <h1>Resolveu se juntar a nós?</h1>
                <Image style={{display:"flex", marginLeft: "auto", marginRight: "auto", padding: "60px 0px", height:"100%"}} src={Welcome}/>

                <h4 style={{width:"80%", padding: "40px 0px", fontSize: "17px"}}>
                    Antes de começarmos, precisamos coletar algumas informações suas. Fique tranquilo, seus dados estão seguros conosco.
                </h4>

              
                <h3 style={{width:"80%", padding: "10px 0px",}}>
                    
                        Ainda não tem a Metamask?        <a href="https://metamask.io/" target='_blank'> Crie agora!
                    </a>
                </h3>
                <Button onClick={() => router.push('/signup')}>
                    Quero participar! <RightIcon />
                </Button>

            </PageContainer2>
        </>
    )
}
