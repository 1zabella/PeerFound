import { BackIcon } from '@/components/backIcon'
import { Button } from '@/components/button'
import Header from '@/components/header'
import MetamaskForm from '@/components/metamaskForm'
import SignupForm from '@/components/signupForm'
import { PageContainer, Title } from '@/styles/pages/signup'
import { yupResolver } from '@hookform/resolvers/yup'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'


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
console.log(stage)
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
                <title>PeerFound - Criar conta</title>
            </Head>
            <Header />
            <BackIcon onClick={backHandler}/>
            <Title>Antes de começar, iremos criar sua conta no PeerFound</Title>

            <PageContainer stage={stage}>
            {stage === 0 && 
                //Retorna o endereço da carteira da conta conectado 
                <SignupForm errors={errors} handleSubmit={handleSubmit} register={register} setStage={setStage} /> 
                
            } 
            
            {stage === 1 && 
                <MetamaskForm watch={watch}/>
                
            }

   
            </PageContainer>
        </>
    )
}
