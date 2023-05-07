import { ethers } from 'ethers'
import factoryJson from '../contracts/factory.json'
import loanJson from '../contracts/loan.json'

export const factory = async () => {
    const { NEXT_PUBLIC_SEGURO_FACTORY_ADDRESS } = process.env

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();

    const factory = new ethers.Contract(
        NEXT_PUBLIC_SEGURO_FACTORY_ADDRESS!,
        factoryJson.abi,
        signer
    )

    return factory
}

export const loan = async (address: string) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();

    const loan = new ethers.Contract(
        address,
        loanJson.abi,
        signer
    )

    return loan
}

