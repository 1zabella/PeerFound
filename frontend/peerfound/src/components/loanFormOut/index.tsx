import Image from 'next/image'
import React from 'react'
import { Container, MetamaskAccount, Paragraph } from './style'
import MetamaskImage from '../../assets/images/metamask.png'
import { Button } from '../button'
import { RightIcon } from '../rightIcon'
import { useMetamask } from '@/contexts/metamask'
import { useRouter } from 'next/router'
import axios from '../../../axios'
import { toast } from 'react-toastify'
import { useUser } from '@/contexts/user'
import { useState } from 'react'
import Input from '../input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

//Tornar objeto (com a propriedade ethereum) global
declare global {
    interface Window {
        // ⚠️ notice that "Window" is capitalized here
        ethereum: any
    }
}

interface Props {
    watch: any
}

const schema = yup.object().shape({
    email: yup
        .string()
        .email('Insira um email válido')
        .required('O email é um campo obrigatório'),
    password: yup
        .string()
        .min(8, 'A senha deve ter pelo menos 8 caracteres')
        .max(32, 'A senha deve ter no máximo 32 caracteres')
        .required('A senha é um campo obrigatório')
})

//Formulário de conexão com a carteira Metamask.
const LoanFormOut: React.FC<Props> = ({watch}) => {
//Definição do hook useMetamask, que recupera o estado da account
    const router = useRouter() //Hook para manipular a navegação
    const {setUser} = useUser()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })
    //Função para se conectar a metamask
    

    //Se for conecatado o usuário é direcionado para a página dashboard
    const handleContinue = async () => {
        const moneyOfferForm = watch()
        try {
            const res = await axios.post('blockchainchallenge/createMoneyOffer', moneyOfferForm)

            toast.success("empréstimo cadastrado com sucesso!")
            router.replace("/dashboardUser")
        } catch (err: any) {
            console.log(err.response)
            if (err.response) {
                toast.error(err.response.data)
            } else {

                toast.error("Erro ao cadastrar oferta de empréstimo!")
            }
        }
       
    }

    //Retorna a interface do formulário
    return (
        <Container>
            <Input
                register={register}
                name="value"
                label="Valor *"
                error={errors['value']}
                type="number"
            />
            <Input
                register={register}
                name="interestRate"
                label="Taxa de interesse *"
                type="number"
                error={errors['interestRate']}
            />
            <Input 
                register={register}
                name="investmentTerm"
                label="Termino de empréstimo (dias) *"
                type="number"
                error={errors['investmentTerm']}
            />
            <Input 
                register={register}
                name="userWallet"
                label="Carteira*"
                type="string"
                error={errors['userWallet']}
            />

            <Button style={{marginTop: "20px"}} onClick={handleContinue} >
                Salvar <RightIcon />
            </Button>
        </Container>
    )
}





export default LoanFormOut
