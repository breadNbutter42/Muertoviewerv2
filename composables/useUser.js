import { ethers } from 'ethers'

export default function () {

  const config = useRuntimeConfig()
  const { getChainId, getCurrentUser, lookupAddress, getAvatar, getBalance, requestAccounts, getSigner } = useWallet()
  const { sliceAddress, getMetadata } = useUtils()
  const { getStakedInfo, stakedBalance, getApproved, connectNftContract, connectStakingContract } = useContract()

  const testAddy = '0xe5636D672df88FAB180ae99A4a93feabAC6a4f00'

  const testArr = [2286, 1420, 5525, 5793, 2994, 8566]
  const testArr1 = [4315, 5250, 9173, 1757, 5948, 1295]

  const address = useState('address', () => null)
  const chainId = useState('chainId', () => null)
  const balance = useState('balance', () => null)

  const ensName = useState('ensName', () => null)
  const ensAvatar = useState('ensAvatar', () => null)

  const ownedTokens = useState('ownedTokens', () => [])

  const username = computed(() => ensName.value || sliceAddress(address.value))

  const isNetwork = computed(() => config.NETWORK_ID === chainId.value)
  const isAuthenticated = computed(() => Boolean(address.value))

  const unstakedBalance = useState('unstakedBalance', () => [])

  const detectChain = async () => chainId.value = await getChainId()

  const formatBalance = (balance) => {
    if (!parseInt(balance)) return 0
    return parseFloat(ethers.utils.formatEther(balance)).toFixed(4)
  }

  const userLoading = useState('userLoading', () => false)

  const resetUser = () => {
    address.value = null
    balance.value = null
    ensName.value = null
    ensAvatar.value = null
    ownedTokens.value = []
    stakedBalance.value = []
    unstakedBalance.value = []
  }

  const loadUserData = async (_addy) => {
    try {
      if (_addy.length) {
        address.value = _addy[0]
        ensName.value = await lookupAddress(_addy[0])
        balance.value = await getBalance(_addy[0]).then(res => formatBalance(res))
        if (ensName.value) ensAvatar.value = await getAvatar(ensName.value)
        // unstakedBalance.value = testArr1
        // stakedBalance.value = testArr
        unstakedBalance.value = await $fetch(`/api/muerto-balance?address=${_addy[0]}`)
        await getStakedInfo(_addy[0]).then(res => {
          stakedBalance.value = []
          if (res) res.forEach(token => stakedBalance.value.push(parseInt(token.tokenId)))
        })
        if (unstakedBalance.value || stakedBalance.value) ownedTokens.value = getMetadata({ tokens: [...unstakedBalance.value, ...stakedBalance.value] })
        if (ownedTokens.value) ownedTokens.value.filter(x => !!x)
        await getApproved(_addy[0])
      } else {
        resetUser()
      }
    } catch (error) {
      console.log(error)
    } finally {
      const sig = getSigner()
      connectNftContract(sig)
      connectStakingContract(sig)
    }
  }

  const loadConnectedWallet = async () => {
    try {
      userLoading.value = true
      await getCurrentUser()
        .then(res => loadUserData(res))
    } catch (error) {
      console.log(error)
    } finally {
      userLoading.value = false
    }
  }

  const connectUser = async () => {
    try {
      userLoading.value = true
      await requestAccounts()
        .then(res => loadUserData(res))
    } catch (error) {
      console.log(error)
    } finally {
      userLoading.value = false
    }
  }

  return {
    address,
    chainId,
    balance,
    ensAvatar,
    ensName,
    ownedTokens,
    username,
    isNetwork,
    isAuthenticated,
    detectChain,
    userLoading,
    resetUser,
    loadConnectedWallet,
    connectUser,
    loadUserData,
    unstakedBalance
  }

}