import { BackIcon } from '@/components/backIcon'
import Header from '@/components/header'
import  {LoanContainer} from '@/components/loanContainer'
import { StartText } from '@/components/startText'
import { PageContainer, Title } from '@/styles/pages/signup'
import { yupResolver } from '@hookform/resolvers/yup'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import ReciveForm from '@/components/reciveForm'
import LoanFormOut from '@/components/loanFormOut'


const schema = yup.object().shape({
    email: yup
        .string()
        .email('Insira um email válido')
        .required('O email é um campo obrigatório'),
})

export default function Signup() {
    
    const router = useRouter()
    const [stage, setStage] = useState(0)
    const backHandler = () => {
        if (stage == 0) {
            router.replace("/")
        } else if (stage == 1) {
            setStage(0)
        }
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })

    return (
        <>
            <Head>
                <title>PeerFound - Solicitar empréstimo</title>
            </Head>
            <Header />
            
                <BackIcon onClick={backHandler}/>
                <LoanContainer>
                    <StartText>
                        <b>Solicitar empréstimo</b>
                        <br /> Realize um empréstimo
                    </StartText>
                </LoanContainer>
                
           
                <PageContainer stage={stage}>
                {stage === 0 && 
                    //Retorna o endereço da carteira da conta conectado 
                    <ReciveForm errors={errors} handleSubmit={handleSubmit} register={register} setStage={setStage} /> 
                    
                } 
                
                {stage === 1 && 
                    <LoanFormOut watch={watch}/>
                    
                }

    
                </PageContainer>
            
        </>
    )
}
