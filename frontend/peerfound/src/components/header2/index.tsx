import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { HeaderContainer2 } from './style'
import { useUser } from '@/contexts/user'
import Logo from '../../assets/images/icon.png'

interface Props { }

const Header2: React.FC<Props> = props => {
    const { user } = useUser()
    return (
        <HeaderContainer2>
            <Image src={Logo} alt="logo" />
        </HeaderContainer2>
    )
}

export default Header2
