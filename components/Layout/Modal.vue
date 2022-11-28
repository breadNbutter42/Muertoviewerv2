<script setup>
const config = useRuntimeConfig()
const contract = config.public.CONTRACT_ADDR


const { fixURL, sliceAddress, getMetadata, toggleQuery, createFilterObject, generateFilters } = useUtils()
const { lookupAddress } = useWallet()
const { closeBox } = useModal()

const route = useRoute()
const router = useRouter()

const activeToken = useState('activeToken')
const searchQuery = useState('search', () => createFilterObject(generateFilters(getMetadata({ all: true }))))

const token = getMetadata({ token: activeToken.value })

const { data } = useFetch(`/api/lookup-token?id=${activeToken.value}`)

useHead({
  title: `Token #${activeToken.value} - MuertoViewer.xyz`
})

const owner = reactive({
  isStaked: null,
  ensName: null,
  address: null,
  username: computed(() => owner.ensName || sliceAddress(owner.address.toLowerCase()))
})

watch(data, async () => {
  try {
    if (data.value.owner_of) {
      owner.isStaked = data.value.is_staked
      owner.address = data.value.owner_of
      owner.ensName = data.value.ens
    }
  } catch (error) {
    console.log(error)
  }
})

onMounted(async () => {
  if (data.value?.owner_of) {
    owner.isStaked = data.value.is_staked
    owner.address = data.value.owner_of
    owner.ensName = data.value.ens
  }
})

const backgroundColor = computed(() => {
  if (token.attributes[0].trait_type === 'Background') {
    switch (token.attributes[0].value) {
    case 'Light Blue':
      return 'bg-[#add8e6]'
    case 'Light Purple':
      return 'bg-[#e2d1f9]'
    case 'Orange':
      return 'bg-[#eea47f]'
    case 'Purple Sky':
      return 'bg-[#decaf9]'
    case 'Tosca':
      return 'bg-[#00a79f]'
    case 'Yellow':
      return 'bg-[#efc050]'
    }
  } else if (token.attributes[0].trait_type === 'One of One') {
    return 'bg-zinc-800'
  }
})
const accentColor = computed(() => {
  if (token.attributes[0].trait_type === 'Background') {
    switch (token.attributes[0].value) {
    case 'Light Blue':
      return 'bg-[#ccffff] hover:bg-[#ccffff]/[.5]'
    case 'Light Purple':
      return 'bg-[#faddff] hover:bg-[#faddff]/[.5]'
    case 'Orange':
      return 'bg-[#ffc298] hover:bg-[#ffc298]/[.5]'
    case 'Purple Sky':
      return 'bg-[#faddff] hover:bg-[#faddff]/[.5]'
    case 'Tosca':
      return 'bg-[#00c5be] hover:bg-[#00c5be]/[.5]'
    case 'Yellow':
      return 'bg-[#ffe360] hover:bg-[#ffe360]/[.5]'
    }
  } else if (token.attributes[0].trait_type === 'One of One') {
    return 'bg-[#2e2e32] hover:bg-[#2e2e32]/[.5]'
  }
})
const textColor = computed(() => {
  if (token.attributes[0].trait_type === 'Background') {
    switch (token.attributes[0].value) {
    case 'Light Blue':
      return 'text-zinc-800'
    case 'Light Purple':
      return 'text-zinc-800'
    case 'Orange':
      return 'text-zinc-800'
    case 'Purple Sky':
      return 'text-zinc-800'
    case 'Tosca':
      return 'text-zinc-800'
    case 'Yellow':
      return 'text-zinc-800'
    }
  } else if (token.attributes[0].trait_type === 'One of One') {
    return 'text-white'
  }
})
const headlineColor = computed(() => {
  if (token.attributes[0].trait_type === 'Background') {
    switch (token.attributes[0].value) {
    case 'Light Blue':
      return 'text-zinc-800 mix-blend-color-dodge'
    case 'Light Purple':
      return 'text-zinc-800 mix-blend-color-dodge'
    case 'Orange':
      return 'text-zinc-800 mix-blend-color-dodge'
    case 'Purple Sky':
      return 'text-zinc-800 mix-blend-color-dodge'
    case 'Tosca':
      return 'text-zinc-800 mix-blend-color-dodge'
    case 'Yellow':
      return 'text-zinc-800 mix-blend-color-dodge'
    }
  } else if (token.attributes[0].trait_type === 'One of One') {
    return 'text-zinc-100'
  }
})

const toggle = (_key, _trait, _search) => {
  closeBox()
  toggleQuery(_key, _trait, _search)
  if (route.name !== 'gallery') router.push({ path: '/gallery' })
}
</script>

<template>
  <div :class="`fixed top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-10 dark:bg-opacity-50 backdrop-blur-md ${textColor} flex justify-center items-center p-8 lg:p-0`" @click.self="$emit('hide-modal')">
    <div :class="`transition-all rounded-xl overflow-hidden lg:flex 2xl:max-w-[90vw] max-h-[90vh] scrollbar-lightbox ${backgroundColor} shadow-xl shadow-black/[.2]`">
      <div data-aos="fade-up" :class="`h-full lg:min-h-[425px] lg:min-w-[425px] lg:max-h-[425px] w-full max-w-[425px] lg:max-w-[420px] ${backgroundColor}`">
        <a :href="fixURL(`ipfs://QmeuSEDRnjxtEyk5qBzhpoEmAP6xXSWwXkFtUwoaZCgijZ/${activeToken}.png`)" target="_blank">
          <img :src="fixURL(`ipfs://QmeuSEDRnjxtEyk5qBzhpoEmAP6xXSWwXkFtUwoaZCgijZ/${activeToken}.png`)" />
        </a>
      </div>
      <div class="px-4 py-8 lg:px-8 flex flex-col gap-4 max-w-[420px] lg:max-w-none lg:min-w-[520px]">
        <div :class="`font-black font-anton text-[7vw] md:text-5xl uppercase ${headlineColor} tracking-wider`">
          {{ token.name }}
        </div>
        <div>
          <a :href="`https://opensea.io/assets/${contract}/${token.id}`" target="_blank" :class="`p-2 transition-all ${accentColor} shadow-xl shadow-black/[.1] text-[2vw] rounded-md sm:text-[10px]`">
            OpenSea
          </a>
          <a :href="`https://looksrare.org/collections/${contract}/${token.id}`" target="_blank" :class="`p-2 transition-all ${accentColor} shadow-xl shadow-black/[.1] text-[2vw] ml-2 rounded-md sm:text-[10px]`">
            LooksRare
          </a>
          <a :href="`https://rarible.com/token/${contract}:${token.id}`" target="_blank" :class="`p-2 transition-all ${accentColor} shadow-xl shadow-black/[.1] text-[2vw] ml-2 rounded-md sm:text-[10px]`">
            Rarible
          </a>
          <a :href="`https://nft.coinbase.com/nft/ethereum/${contract}/${token.id}`" target="_blank" :class="`p-2 transition-all ${accentColor} shadow-xl shadow-black/[.1] text-[2vw] ml-2 rounded-md sm:text-[10px]`">
            Coinbase
          </a>
        </div>
        <div class="flex flex-wrap gap-2">
          <div :class="`text-[10px] p-2 flex items-center ${accentColor} shadow-xl shadow-black/[.1] rounded-md flex-1 truncate`">
            <span class="uppercase">Owner</span>
            <Transition name="galleryAnim">
              <div v-if="owner.address" class="inline">
                <a :href="`https://etherscan.io/address/${owner.address}`" target="_blank" class="ml-2 underline transition-all underline-offset-1">{{ owner.username }}</a>
              </div>
              <div v-else class="inline ml-2 w-full">
                <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 100 100" enable-background="new 0 0 0 0" fill="currentColor" class="inline max-w-[15px]" xml:space="preserve">
                    <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                      <animateTransform 
                        attributeName="transform" 
                        attributeType="XML" 
                        type="rotate"
                        dur="1s" 
                        from="0 50 50"
                        to="360 50 50" 
                        repeatCount="indefinite" />
                  </path>
                </svg>
              </div>
            </Transition>
          </div>
          <div :class="`text-[10px] p-2 flex items-center ${accentColor} shadow-xl shadow-black/[.1] rounded-md flex-1`">
            <span class="uppercase">STATUS</span>
            <Transition name="galleryAnim">
              <div v-if="owner.address" class="inline ml-2 uppercase w-full">
                {{ owner.isStaked ? 'Staked' : 'Not staked' }}
              </div>
              <div v-else class="inline ml-2 w-full">
                <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 100 100" enable-background="new 0 0 0 0" fill="currentColor" class="inline max-w-[15px]" xml:space="preserve">
                    <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                      <animateTransform 
                        attributeName="transform" 
                        attributeType="XML" 
                        type="rotate"
                        dur="1s" 
                        from="0 50 50"
                        to="360 50 50" 
                        repeatCount="indefinite" />
                  </path>
                </svg>
              </div>
            </Transition>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2 mt-auto">
          <div v-for="(trait, i) in token.attributes" :key="i" :class="`max-w-[300px] transition-all ${accentColor} shadow-xl shadow-black/[.1] rounded-md py-2 px-4 cursor-pointer`" @click="toggle(trait.trait_type, trait.value, searchQuery)">
            <div :class="`uppercase transition-all text-[2vw] sm:text-sm font-black pointer-events-none`">
              {{ trait.trait_type }}
            </div>
            <div class="uppercase tracking-tighter text-[2.5vw] sm:text-base pointer-events-none truncate">
              {{ trait.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
