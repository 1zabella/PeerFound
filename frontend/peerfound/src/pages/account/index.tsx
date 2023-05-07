import { LogoutButton } from '@/components/button'
import PageWrapper from '@/components/pageWrapper'
import { StartText } from '@/components/startText'
import ViewInfo from '@/components/viewInfo'
import { useUser } from '@/contexts/user'
import { Content } from '@/styles/pages/account'
import Head from 'next/head'

import { BiLogOutCircle } from 'react-icons/bi'
import Loader from '@/components/loader'
import RequireAuthentication from '@/HOC/requireAuthentication'


const Account=()=> {
    const { user, handleLogout } = useUser()

    return (
        <>
            <Head>
                <title>PeerFound - Account</title>
            </Head>
            <PageWrapper>
                <>
                    <StartText>
                        <b>Conta</b>
                        <br /> Suas informações:
                    </StartText>
                    <Content>
                        {
                            user ? <> <ViewInfo label={'Email:'} value={user.email} />
                                <ViewInfo label={'Wallet:'} value={user.wallet} />
                                <LogoutButton onClick={() => handleLogout("/")}>
                                    <span>
                                        <BiLogOutCircle /> Logout
                                    </span>
                                </LogoutButton></> : <Loader />
                        }

                    </Content>
                </>
            </PageWrapper>
        </>
    )
}

export default RequireAuthentication(Account)
