import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Icon from '../../assets/images/icon.png'
import { HeaderContainer } from './style'
import { useUser } from '@/contexts/user'
import { BsFillPersonFill, BsPersonCircle } from 'react-icons/bs'


interface Props { }

const Header: React.FC<Props> = props => {
    
    return (
        <HeaderContainer>
            <Link href="/dashboard">
                <Image className={HeaderContainer.img} src={Icon} alt="Logo" />
            </Link>
        </HeaderContainer>
    )
}

export default Header
