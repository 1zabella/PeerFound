import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../button'
import Input from '../input'
import { RightIcon } from '../rightIcon'
import { Container } from './style'
import { toast } from 'react-toastify';
import Link from 'next/link'


interface Props {
    setStage(stage: number): void
    handleSubmit: any
    register: any
    errors: any
}

const LoanFormAgent: React.FC<Props> = ({ setStage,errors,handleSubmit,register }) => {
  

    return (
        <Container>
        <h3>Que tal começar a ofertar empréstimo? Só precisamos de algumas informações! </h3>
        <Button onClick={() => setStage(1)}>Continuar <RightIcon /></Button>
        </Container>
        
        
    )
}

export default LoanFormAgent
