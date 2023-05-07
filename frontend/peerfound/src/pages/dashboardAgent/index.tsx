import Notification from '@/components/notification'
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
import Sidebar from '../../components/sidebar'
import Navbar from '@/components/navbarAgent'
import NavbarAgent from '@/components/navbarAgent'

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

    return (
        <>
            <Head>
                <title>PeerFound - Dashboard</title>
            </Head>
            <PageWrapper>
                <>
                    <StartText>
                        <b>Sua carteira</b>
                        <br /> Confira seu saldo atual
                    </StartText>
                    <h3>Saldo atual:</h3>
                    <Input style={{ marginTop: '10px' }}
                    register={register}
                    name="email"
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
                </>
            </PageWrapper>
            <NavbarAgent/>
        </>
    )
}

export default RequireAuthentication(Dashboard)