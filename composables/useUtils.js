import meta from '~/assets/meta.json'
export default function () {

  const paginate = (array, pageSize, pageNumber) => array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)

  const fixURL = (url) => {
    if (url.startsWith("ipfs")) {
      let hash = url.split("ipfs://")
      hash = hash.filter((x) => !!x)
      return `https://ipfs.moralis.io:2053/ipfs/${hash}`
    } else {
      return url
    }
  }

  const generateFilters = (metadata) => {
    if (!metadata) return
    let filters = {}

    metadata.forEach((token) => {
      if (token.attributes) {
        token.attributes.forEach((attribute) => {
          if (!filters[attribute.trait_type]) {
            filters[attribute.trait_type] = []
          }
          if (!filters[attribute.trait_type].find(x => x.name === attribute.value)) {
            filters[attribute.trait_type].push({ name: attribute.value, occurrence: attribute.occurrence })
          }
        })
      }
    })
    for (const key in filters) {
      filters[key].sort((a, b) => b.occurrence - a.occurrence)
    }
    
    return filters
  }

  const filterData = (_metadata, _filters) => {
    const filterById = (token) => typeof _filters.id === 'number' ? _filters.id === token.id : true
    const filterByTraits = (token) => Object.entries(_filters).filter(([ key, value ]) => value?.length).map(([key, value]) => key).every(key => _filters[key].includes(token.attributes?.find(attribute => attribute.trait_type === key)?.value))
    return _metadata
            .filter(filterById)
            .filter(filterByTraits)
            .sort((a, b) => a.id + b.id)
  }

  const createFilterObject = (list) => {
    const tempObj = {}

    Object.keys(list).every((key) => tempObj[key] = [])
    tempObj.id = []

    return tempObj
  }

  const sliceAddress = (_address, chars = 5) => _address ? `${_address.slice(0, chars)}...${_address.slice(-chars)}` : null

  const randomNumber = (min = 1, max) => Math.floor(Math.random() * (max - min + 1)) + min

  const getMetadata = (query) => {
    if (query.token) {
      return meta[Number(query.token) - 1]
    } else if (query.tokens) {
      let array = new Array
      if (query.tokens.length) {
        query.tokens.forEach(token => array.push(meta[token - 1]))
        return array
      }
    } else if (query.all) {
      return meta
    }
  }

  const toggleQuery = (cat, trait, searchArray) => {
    if (cat === 'id') {
      searchArray[cat] = []
    } else if (searchArray[cat].includes(trait)) {
      searchArray[cat].splice(searchArray[cat].indexOf(trait), 1)
    } else {
      searchArray[cat].push(trait)
    }
  }

  return {
    paginate,
    fixURL,
    generateFilters,
    filterData,
    createFilterObject,
    sliceAddress,
    randomNumber,
    getMetadata,
    toggleQuery
  }
}