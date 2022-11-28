import { ethers } from 'ethers'

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {

  const query = useQuery(event)
  const token = query.id

  const provider = new ethers.providers.AlchemyProvider(null, config.API_KEY)

  const nftABI = [
    {
      "inputs": [
        { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
      ],
      "name": "ownerOf",
      "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  const stakingABI = [
    {
      "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "name": "tokenStakedInfo",
      "outputs": [
        { "internalType": "address", "name": "owner", "type": "address" },
        { "internalType": "uint256", "name": "stakedAt", "type": "uint256" },
        { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  const contract = new ethers.Contract(config.public.CONTRACT_ADDR, nftABI, provider)
  
  const owner_of = await contract.ownerOf(token)

  if (owner_of.toLowerCase() === config.public.STAKING_ADDR.toLowerCase()) {

    const stakingContract = new ethers.Contract(config.public.STAKING_ADDR, stakingABI, provider)

    const { owner: owner_of } = await stakingContract.tokenStakedInfo(token)
    const ens = await provider.lookupAddress(owner_of)

    return { is_staked: true, owner_of, ens }
  }

  const ens = await provider.lookupAddress(owner_of)

  return { is_staked: false, owner_of, ens }
})