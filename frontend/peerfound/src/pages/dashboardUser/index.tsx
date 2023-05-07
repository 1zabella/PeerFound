
import { NoNotification } from '@/components/notification/style'
import PageWrapper from '@/components/pageWrapper'
import { StartText } from '@/components/startText'
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import axios from '../../../axios'
import RequireAuthentication from '@/HOC/requireAuthentication'
import { useUser } from '@/contexts/user'
import { useRouter } from 'next/router'
import Input from '@/components/input'
import { useForm } from 'react-hook-form'
import NavbarUser from '@/components/navbarUser'
import { Button } from '@/components/button'
import { RightIcon } from '@/components/rightIcon'
import { toast } from 'react-toastify'
import { Form } from '@/components/firstPayment/style'

const Dashboard = () => {
    const [notifications, setNotifications] = useState<any>([])
    const {user} = useUser()
    const router = useRouter()

    const getInvites = async () => {
        try {
            const res = await axios.get('/insurance/user/invites')
            setNotifications(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (user && user!.insurance!) {
            router.replace('/group')
            return
        }
    }, [user])

  
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const onSubmit = (data: any) => {
        // Fazer requisição para backend aqui
    }

    const handleContinue = async () => {

        try {
            const res = await axios.post('blockchainchallenge/createMoneyOffer')
            if(res.data) {
            toast.success("empréstimo cadastrado com sucesso!")
            router.replace("/wallet")
            }
        } catch (err: any) {
            console.log(err.response)
            if (err.response) {
                toast.error(err.response.data)
            } else {

                toast.error("Erro ao cadastrar oferta de empréstimo!")
            }
        }  
    }

    return (
        <>
            <Head>
                <title>PeerFound - Dashboard</title>
            </Head>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <PageWrapper>
                <>
                    <StartText>
                        <b>Sua carteira</b>
                        <br /> Confira seu saldo atual
                    </StartText>
                    <h3>Saldo atual:</h3>
                    <Input style={{ marginTop: '10px' }}
                    register={register}
                    name="deposit"
                    error={errors['email']}
                    type="number"
                    placeholder="R$ 0,00"
                />

                    {notifications && notifications.length > 0 ? (
                        <StartText>
                        <b>Seus empréstimos</b>
                        <br /> Empréstimos realizados
                    </StartText>
                    ) : (
                        <NoNotification>
                            Nenhum empréstimo encontrado em sua conta.
                        </NoNotification>
                    )}
                      <Button style={{marginTop: "10%"}} onClick={handleContinue} >
                Transferir <RightIcon />
                </Button>

                </>

              
            </PageWrapper>
            </Form>
            <NavbarUser/>
        </>
    )
}

export default RequireAuthentication(Dashboard)