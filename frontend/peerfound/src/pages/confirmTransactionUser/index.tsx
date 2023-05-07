import React from 'react'
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
import wallet from '../wallet'
import { ethers } from 'ethers'


interface Props {
    openWallet(): void
}

const ConfirmTransaction: React.FC<Props> = ({ openWallet }) => {
    const router = useRouter()
    const [stage, setStage] = useState(0)
    const handleContinue = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
// Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
    const abi = ["function transfer(address to, uint amount)"];
    const erc20 = new ethers.Contract("0x6A67d3dcA9cEFF94762b1d57A3B217e63c6CeB82", abi, signer);

    const transferToAddress = signer.getAddress();
    const amount = ethers.utils.parseUnits("1", 6);

    await erc20.transfer(transferToAddress, amount, { gasLimit: 100000 });
    }

    return (
        <>
        <Head>
                <title>PeerFound - Confirmar empréstimo</title>
        </Head>
        <Header />
        <BackIcon onClick={handleContinue}/>
                <LoanContainer>
                    <StartText>
                        <b>Confirmar empréstimo</b>
                    <br /> Aceitar empréstimo ofertado
                </StartText>
            </LoanContainer>

        <Container>
        <h3 style={{textAlign:"center", margin:"20%"}}> Seus empréstimo foi aprovado, para depositar o dinheiro é necessario aceitar o empréstimo.</h3>
        
        </Container>
        <Button style={{marginTop: "10%"}} onClick={handleContinue} >
                Transferir <RightIcon />
        </Button>
      </>
    )
}

export default ConfirmTransaction
