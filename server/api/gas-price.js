import ethers from 'ethers'
const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {

  const provider = new ethers.providers.AlchemyProvider(null, config.API_KEY)

  const gas = await provider.getGasPrice()
    .then(res => ethers.utils.formatUnits(parseInt(res), 'gwei'))
    .catch(e => event.res.end({ statusCode: e.statusCode, statusMessage: e.statusMessage, url: e.url }))
  
  return parseInt(gas)

})