// @ -2,19 +2,49 @@ import React from 'react'
import { Button } from '../../components/button'
import { RightIcon } from '../../components/rightIcon'
import { Container } from '../../components/loanFormIn/style'
import Head from 'next/head'
import Header from '@/components/header'
import { BackIcon } from '@/components/backIcon'
import { LoanContainer } from '@/components/loanContainer'
import { StartText } from '@/components/startText'
import { useState } from 'react'
import { useRouter } from 'next/router'

interface Props {
    openWallet(): void
}

const PayBackMoney: React.FC<Props> = ({ openWallet }) => {
  
    const router = useRouter()
    const [stage, setStage] = useState(0)
    const backHandler = () => {
        if (stage == 0) {
            router.replace("/")
        } else if (stage == 1) {
            setStage(0)
        }
    }

    return (
        <>
        <Head>
                <title>PeerFound - Solicitar empréstimo</title>
        </Head>
        <Header />
        <BackIcon onClick={backHandler}/>
                <LoanContainer>
                    <StartText>
                        <b>Oferta empréstimo</b>
                    <br /> Analisar demandas
                </StartText>
            </LoanContainer>

        <Container>
        <h3> Pay back your loan</h3>
        <h3 style={{textAlign:"center", margin:"20%"}}> Pay back your loan</h3>
        <Button onClick={() => openWallet()}>Pay Back<RightIcon /></Button>
        </Container>
        </>
      
    )
}

export default PayBackMoney

