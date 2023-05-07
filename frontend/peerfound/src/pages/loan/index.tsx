import { BackIcon } from '@/components/backIcon'
import { Button } from '@/components/button'
import Header from '@/components/header'
import MetamaskForm from '@/components/metamaskForm'
import LoanForm from '@/components/loanFormAgent'
import  {LoanContainer} from '@/components/loanContainer'
import { StartText } from '@/components/startText'
import { PageContainer, Title } from '@/styles/pages/signup'
import { yupResolver } from '@hookform/resolvers/yup'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import PageWrapper from '@/components/pageWrapper'
import * as yup from 'yup'
import { LoaderContainer } from '@/components/loader/style'
import LoanFormIn from '@/components/loanFormIn'


const schema = yup.object().shape({
    email: yup
        .string()
        .email('Insira um email válido')
        .required('O email é um campo obrigatório'),
    password: yup
        .string()
        .min(8, 'A senha deve ter pelo menos 8 caracteres')
        .max(32, 'A senha deve ter no máximo 32 caracteres')
        .required('A senha é um campo obrigatório'),
    confirmPassword: yup
        .string()
        .min(8, 'A senha deve ter pelo menos 8 caracteres')
        .max(32, 'A senha deve ter no máximo 32 caracteres')
        .required('A confirmação de senha é um campo obrigatório'),
    document: yup
        .string()
        .min(9, 'O documento deve ter pelo menos 9 caracteres')
        .max(11, 'O documento deve ter no máximo 11 caracteres')
        .required('O documento é um campo obrigatório'),

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
                        <b>Oferta empréstimo</b>
                        <br /> Analisar demandas
                    </StartText>
                </LoanContainer>
                
           
                <PageContainer stage={stage}>
                {stage === 0 && 
                    //Retorna o endereço da carteira da conta conectado 
                    <LoanForm errors={errors} handleSubmit={handleSubmit} register={register} setStage={setStage} /> 
                    
                } 
                
                {stage === 1 && 
                    <LoanFormIn watch={watch}/>
                    
                }

    
                </PageContainer>
            
        </>
    )
}
