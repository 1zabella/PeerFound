import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../button'
import Input from '../input'
import { RightIcon } from '../rightIcon'
import { Form } from './style'
import { toast } from 'react-toastify';
import Link from 'next/link'


interface Props {
    setStage(stage: number): void
    handleSubmit: any
    register: any
    errors: any
}

const SignupForm: React.FC<Props> = ({ setStage,errors,handleSubmit,register }) => {
    const onSubmit = (data: any) => {
        if (data.password != data.confirmPassword) {
            return toast.error("As senhas estão diferentes!")
        }
        setStage(1)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>

            <Input
                register={register}
                name="email"
                label="E-mail *"
                error={errors['email']}
                type="email"
            />
            <Input
                register={register}
                name="document"
                label="Social Security Number ou CPF *"
                error={errors['document']}
            />
            <Input
                register={register}
                name="password"
                label="Senha *"
                type="password"
                error={errors['password']}
            />
            
            <Input
                register={register}
                name="confirmPassword"
                type="password"
                label="Confirme sua senha *"
                error={errors['confirmPassword']}
            />
            
            <Button marginTop>
                Continuar <RightIcon />
            </Button>

            <Link href="/login">
                Já tem conta?Login
            </Link>
        </Form>
    )
}

export default SignupForm
