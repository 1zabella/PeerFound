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
import { Button } from '@/components/button'

const Type = () => {
    function handleClick() {
        window.location.href = 'dashboardAgent';
      }
      function handleClick1() {
        window.location.href = '/dashboardUser';
      }
    return (
        <>
            <Head>
                <title>PeerFound - Dashboard</title>
            </Head>
            <PageWrapper>
                <>
                    <StartText>
                        <b>Tipo de usuário</b>
                        <br /> Por favor, selecione o seu tipo de usuário.
                    </StartText>
                    

                 <Button onClick={handleClick}>
                 Corretor de crédito
                 </Button>

                 <Button style={{marginTop:"20px"}} onClick={handleClick1}>
                 Cliente de crédito
                 </Button>
                 
                </>
            </PageWrapper>
            
        </>
    )
}

export default RequireAuthentication(Type)