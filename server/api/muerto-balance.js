import ethers from 'ethers'
const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {

  const query = useQuery(event)
  const address = query.address

  const getData = async (_address) => await $fetch(`${config.API_URL}/${config.API_KEY}/getNFTs/?owner=${_address}&contractAddresses[]=${config.public.CONTRACT_ADDR}&withMetadata=false`)
    .catch((e) => event.res.end(JSON.stringify(e.message)))

  const ownedArr = []

  if (ethers.utils.isAddress(address)) {

    await getData(address).then(res => res.ownedNfts.map(token => ownedArr.push(parseInt(token.id.tokenId))))

    return ownedArr
  } else if (address) {

    const provider = new ethers.providers.AlchemyProvider(null, config.API_KEY)
    const resolvedENS = await provider.resolveName(address)

    await getData(resolvedENS).then(res => res.ownedNfts.map(token => ownedArr.push(parseInt(token.id.tokenId))))

    return ownedArr
  } else {
    
    return ['No address provided']
  }

})