import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Container, PayBack, PeopleIcon, WalletIcon, FaMoney } from './style'
import { useUser } from '@/contexts/user'

interface Props {}

const NavbarUser: React.FC<Props> = props => {
    const router = useRouter()
    const { user } = useUser()
    const [items, setItems] = useState([
        {
            icon: PeopleIcon,
            link: '/account',
            text: 'Perfil'
        },
        {
            icon: FaMoney,
            link: '/loanRecive',
            text: 'Empréstimo'
        },{
            icon: PayBack,
            link: '/payBackMoney',
            text: 'Pagamentos'
        },{
            icon: WalletIcon,
            link: '/dashboard',
            text: 'Wallet'
        }
    ])


    return (
        <Container>
            {items.map(item => (
                <div key={item.link}>
                    <Link href={item.link}>
                        <item.icon isActive={router.asPath == item.link} />
                        <span>{item.text}</span>
                    </Link>
                </div>
            ))}
        </Container>
    )
}

export default NavbarUser
