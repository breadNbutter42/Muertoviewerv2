import { ethers } from 'ethers'
import NFT_ABI from '@/assets/nft.json'
import STAKING_ABI from '@/assets/staking.json'
import { useToast } from 'vue-toastification'
import mitt from 'mitt'

export default createSharedComposable(() => {

  const nftAddress = useRuntimeConfig().public.CONTRACT_ADDR
  const stakingAddress = useRuntimeConfig().public.STAKING_ADDR

  const { getProvider } = useWallet()

  const toast = useToast()
  const emitter = mitt()

  const contractLoading = ref(false)
  const contractLoaded = ref(false)

  let nftContract = {}
  let stakingContract = {}

  const staked = useState('staked', () => 0)
  const isApproved = useState('isApproved', () => false)

  const stakedBalance = useState('stakedBalance', () => [])

  const isContractConnected = computed(() => Boolean(name.value))

  const connectNftContract = (_who) => nftContract = new ethers.Contract(nftAddress, NFT_ABI, _who)

  const connectStakingContract = (_who) => stakingContract = new ethers.Contract(stakingAddress, STAKING_ABI, _who)

  const getStakedInfo = async (_address) => await stakingContract.walletOfOwner(_address)

  const getTokenStakedInfo = async (_token) => await stakingContract.tokenStakedInfo(_token)

  const getStaked = async () => staked.value = await stakingContract.stakedCount().then(res => parseInt(res))

  const getApproved = async (address) => isApproved.value = await nftContract.isApprovedForAll(address, stakingAddress)

  const setApprove = async (address, bool) => {
    try {
      const tx = await nftContract.setApprovalForAll(address, bool)
      const result = await tx.wait()
        .then(() => {
          toast.success('Transaction has been mined!')
          emitter.emit('minted')
        })
        
        return Promise.resolve(result)
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }
  const stake = async (tokens) => {
    try {
      const tx = await stakingContract.stake(tokens)
      const result = await tx.wait()
        .then(() => {
          toast.success('Transaction has been mined!')
          emitter.emit('minted')
        })

        return Promise.resolve(result)
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }
  const unstake = async (tokens) => {
    try {
      const tx = await stakingContract.unstake(tokens)
      const result = await tx.wait()
        .then(() => {
          toast.success('Transaction has been mined!')
          emitter.emit('minted')
        })

        return Promise.resolve(result)
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }
  
  const connectSigner = (_signer) => {
    nftContract.connect(_signer)
    stakingContract.connect(_signer)
  }

  const parseEther = (_num) => ethers.utils.parseEther(_num)

  const loadContractState = async (_provider = getProvider()) => {
    contractLoading.value = true
    try {
      connectNftContract(_provider)
      connectStakingContract(_provider)
      await getStaked()
    } catch (e) {
      console.log(e)
      contractLoading.value = false
    } finally {
      contractLoading.value = false
      contractLoaded.value = true
    }
  }

  const resetContract = () => {
    minted.value = null
    stakedBalance.value = null
    staked.value = 0
  }

  return {
    contractLoading,
    contractLoaded,
    staked,
    isContractConnected,
    getStakedInfo,
    stakedBalance,
    connectSigner,
    parseEther,
    loadContractState,
    resetContract,
    getApproved,
    isApproved,
    setApprove,
    connectNftContract,
    connectStakingContract,
    stake,
    unstake,
    emitter,
    getTokenStakedInfo
  }
})
