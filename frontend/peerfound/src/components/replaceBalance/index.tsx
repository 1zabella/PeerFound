import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Button } from '../button'
import Input from '../input'
import { Form } from './style'
import { useRouter } from 'next/router'
import { useUser } from '@/contexts/user'
import { useMetamask } from '@/contexts/metamask'
import { toast } from 'react-toastify'
import { SeguroMutuo } from '../../../ethers'
import { ethers } from 'ethers'
import axios from 'axios'
import Loader from '../loader'

const schema = yup.object().shape({
    value: yup
        .number()
        .typeError('O valor deve ser um número')
        .required('O valor é um campo obrigatório')
})

interface Props {
    getUserBalance(): void
}

const ReplaceBalance: React.FC<Props> = props => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })

    const [loading, setLoading] = useState(false)
    const { user } = useUser()
    const { setAccount } = useMetamask()

    //Função para se conectar a metamask
    const connectToMetamask = async () => {
        if (window.ethereum) {
            //Se conecta a carteira através do método abaixo e define o estado da account
            const res = await window.ethereum.request({
                method: 'eth_requestAccounts'
            })

            setAccount(res[0])
            const sepolia = '0xaa36a7'
            if (window.ethereum.chainId !== sepolia) {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: sepolia }]
                })
            }

            return res[0]

            //Caso não tenha a metamask instalada
        } else {
            alert('Install MetaMask')
        }
    }

    const onSubmit = async (data: any) => {
        setLoading(true)
        try {
            const account = await connectToMetamask()
            if (account !== user?.wallet) {
                toast.error('Conecte ao mesmo endereço do cadastrado!')
                return
            }

            const contractInstance = await SeguroMutuo(user!.insurance.address)
            const formatedValue = ethers.utils.parseUnits(
                data.value.toString(),
                'ether'
            )
            const tx = await contractInstance.replaceBackup({
                value: formatedValue
            })
            await tx.wait()
            toast.success('Reposição de reserva realizada com sucesso!')
            props.getUserBalance()
            reset({ value: '' })
        } catch (err: any) {
            toast.error('Erro ao realizar a reposição!')
        }
        setLoading(false)
    }

    if (loading) {
        return <Loader />
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <p>Repor reserva</p>
            <Input
                label="Valor"
                name="value"
                register={register}
                placeholder="Insira o valor que deseja repor"
                error={errors['value']}
            />
            <Button type="submit">Repor</Button>
        </Form>
    )
}

export default ReplaceBalance
