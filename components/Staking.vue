<script setup>
const props = defineProps(['staked', 'unstaked'])
const { ownedTokens } = useUser()
const { paginate, getMetadata, toggleQuery, filterData } = useUtils()

const { stake, unstake, isApproved } = useContract()

const unstakedBal = props.unstaked ? getMetadata({ tokens: [...props.unstaked] }) : []
const stakedBal = props.staked ? getMetadata({ tokens: [...props.staked] }) : []

const tokens = ref([])

const filteredData = computed(() => tokens.value ? filterData(tokens.value, filters) : [])

const stateList = [
  { name: 'staked', tokens: stakedBal },
  { name: 'unstaked', tokens: unstakedBal },
  { name: 'all', tokens: ownedTokens.value }
]

const graveyardState = useState('graveyardState', () => 'unstaked')

const pageSize = 32
const pageNumber = ref(1)

const paginatedData = ref([])

const computedSize = computed(() => filteredData.value?.length ?? 0)

const hasMore = computed(() => Boolean(paginatedData.value.length < computedSize.value.length))
const loadMore = () => paginatedData.value.push(...paginate(filteredData.value, pageSize, pageNumber.value))

const setState = (state) => {
  pageNumber.value = 1
  paginatedData.value = []
  graveyardState.value = state
  tokens.value = stateList.find(x => x.name === state).tokens
  if (tokens.value) loadMore()
}

const selectedTokens = useState('selectedTokens', () => ({ tokens: [] }))

const selectAll = () => selectedTokens.value.tokens = filteredData.value.map(x => x.id)

const deselectAll = () => selectedTokens.value.tokens = []

const filters = reactive({ id: null })

const resetId = () => filters.id = null

const isStakedSelected = computed(() => Boolean(props.staked.filter(token => selectedTokens.value.tokens.find(id => id === token)).length))
const isUnstakedSelected = computed(() => Boolean(props.unstaked.filter(token => selectedTokens.value.tokens.find(id => id === token)).length))

watch(() => filters.id, () => {
  paginatedData.value = []
  pageNumber.value = 1
  loadMore()
})

onMounted(() => {
  setState('all')
  if (ownedTokens.value?.length) {
    useInfiniteScroll(window, () => {
      pageNumber.value++
      if (tokens.value) loadMore()
    }, {
      distance: 100
    })
  }
})
</script>

<template>
  <div class="lg:mt-16 mb-8">
    <section class="bg-zinc-100/[.3] dark:bg-purple-800/[.5] p-6 rounded-xl">
      <div class="lg:flex justify-between w-full">
        <div class="flex justify-center lg:justify-start">
          <div class="text-xs bg-zinc-100/[.3] dark:bg-purple-800/[.6] rounded-lg px-6 mb-4 inline-block">
            #
            <div class="inline-flex items-center">
              <input v-model="filters.id" type="number" placeholder="ID" class="bg-zinc-100/[.5] dark:bg-purple-800 rounded-md max-w-[100px] font-black py-2 text-center placeholder:font-thin">
              <div v-if="filters.id" class="cursor-pointer inline-block text-black dark:text-purple-400 fill-current" @click="resetId">
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9584 4.25H12.0416C13.4108 4.24999 14.4957 4.24999 15.3621 4.33812C16.2497 4.42841 16.9907 4.61739 17.639 5.05052C18.1576 5.39707 18.6029 5.84239 18.9495 6.36104C19.3826 7.00926 19.5716 7.7503 19.6619 8.63794C19.75 9.5043 19.75 10.5892 19.75 11.9584V12.0416C19.75 13.4108 19.75 14.4957 19.6619 15.3621C19.5716 16.2497 19.3826 16.9907 18.9495 17.639C18.6029 18.1576 18.1576 18.6029 17.639 18.9495C16.9907 19.3826 16.2497 19.5716 15.3621 19.6619C14.4957 19.75 13.4108 19.75 12.0416 19.75H11.9584C10.5892 19.75 9.5043 19.75 8.63794 19.6619C7.7503 19.5716 7.00926 19.3826 6.36104 18.9495C5.84239 18.6029 5.39707 18.1576 5.05052 17.639C4.61739 16.9907 4.42841 16.2497 4.33812 15.3621C4.24999 14.4957 4.24999 13.4108 4.25 12.0416V11.9584C4.24999 10.5892 4.24999 9.5043 4.33812 8.63794C4.42841 7.7503 4.61739 7.00926 5.05052 6.36104C5.39707 5.84239 5.84239 5.39707 6.36104 5.05052C7.00926 4.61739 7.7503 4.42841 8.63794 4.33812C9.5043 4.24999 10.5892 4.24999 11.9584 4.25ZM14.5303 9.46967C14.8232 9.76256 14.8232 10.2374 14.5303 10.5303L13.0607 12L14.5303 13.4697C14.8232 13.7626 14.8232 14.2374 14.5303 14.5303C14.2374 14.8232 13.7626 14.8232 13.4697 14.5303L12 13.0607L10.5303 14.5303C10.2374 14.8232 9.76256 14.8232 9.46967 14.5303C9.17678 14.2374 9.17678 13.7626 9.46967 13.4697L10.9393 12L9.46967 10.5303C9.17678 10.2374 9.17678 9.76256 9.46967 9.46967C9.76256 9.17678 10.2374 9.17678 10.5303 9.46967L12 10.9393L13.4697 9.46967C13.7626 9.17678 14.2374 9.17678 14.5303 9.46967Z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center lg:justify-start">
          <div class="text-xs bg-zinc-100/[.3] dark:bg-purple-800/[.6] rounded-lg px-6 mb-4 inline-block">
            Show:
            <div class="inline-flex gap-1 items-center">
              <button v-for="state in stateList" :key="state.name" :class="`capitalize py-2 hover:bg-zinc-300/[.5] dark:hover:bg-purple-200/[.3] active:bg-zinc-400/[.5] dark:active:bg-purple-400/[.6] cursor-pointer px-2 text-center rounded-md transition-all duration-500 ${graveyardState === state.name ? 'bg-zinc-100 dark:bg-purple-500' : 'border-transparent'}`" @click="setState(state.name)">{{ state.name }} <span class="font-black ml-3">{{ state.tokens?.length ?? 0 }}</span></button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-between bg-zinc-100/[.3] dark:bg-purple-800/[.6] rounded-lg">
        <div class="flex gap-2 items-end">
          <div>
            <button :disabled="!filteredData.length || selectedTokens.tokens.length === filteredData.length || graveyardState === 'all'" class="text-xs py-2 hover:bg-zinc-300/[.5] dark:hover:bg-purple-300/[.8] active:bg-zinc-400/[.5] dark:active:bg-purple-400/[.6] bg-zinc-100/[.5] dark:bg-purple-500 disabled:opacity-30 cursor-pointer px-2 text-center rounded-md transition-all disabled:cursor-not-allowed" @click="selectAll">
              Select all
            </button>
          </div>
          <Transition name="resetButton">
            <div v-if="selectedTokens.tokens.length">
              <button class="text-xs py-2 hover:bg-zinc-300/[.5] dark:hover:bg-purple-300/[.8] active:bg-zinc-400/[.5] dark:active:bg-purple-400/[.6] bg-zinc-100/[.5] dark:bg-purple-500 disabled:opacity-30 cursor-pointer px-2 text-center rounded-md transition-all" @click="deselectAll">
                Deselect all <span class="font-black ml-3">{{ selectedTokens.tokens.length }}</span>
              </button>
            </div>
          </Transition>
        </div>
        <div class="flex gap-2">
          <button :disabled="isStakedSelected || !isApproved || !selectedTokens.tokens.length" @click="stake(selectedTokens.tokens)" class="text-xs py-2 hover:bg-zinc-300/[.5] dark:hover:bg-purple-300/[.8] bg-zinc-100 dark:bg-purple-500 disabled:opacity-30 active:bg-zinc-400/[.5] dark:active:bg-purple-400/[.6] cursor-pointer disabled:cursor-not-allowed px-2 text-center rounded-md transition-all">
            Stake
          </button>
          <button :disabled="isUnstakedSelected || !isApproved || !selectedTokens.tokens.length" @click="unstake(selectedTokens.tokens)" class="text-xs py-2 hover:bg-zinc-300/[.5] dark:hover:bg-purple-300/[.8] bg-zinc-100 dark:bg-purple-500 disabled:opacity-30 active:bg-zinc-400/[.5] dark:active:bg-purple-400/[.6] cursor-pointer disabled:cursor-not-allowed px-2 text-center rounded-md transition-all">
            Unstake
          </button>
        </div>
      </div>
      <Transition name="resetButton">
        <div v-if="selectedTokens.tokens.length" class="mt-4 inline-flex flex-wrap gap-1">
          <LayoutBadge v-for="(query, i) in selectedTokens.tokens" :key="i" @click="toggleQuery('tokens', query, selectedTokens)">
            {{ query }}
          </LayoutBadge>
        </div>
      </Transition>
    </section>
    <section :class="`${filteredData.length ? 'bg-zinc-100/[.3] dark:bg-purple-800/[.5] py-6 rounded-xl' : ''} mt-4`">
      <div class="grid max-w-[500px] sm:max-w-none mx-auto sm:mx-0 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6 px-6 pb-4">
        <GalleryItem
          v-for="(token, i) in paginatedData"
          :key="i"
          :data="token"
          :loading="'eager'"
          :selected="selectedTokens.tokens.find(x => x === token.id)"
          :grayscale="unstaked.find(x => x === token.id)"
          @click="toggleQuery('tokens', token.id, selectedTokens)"
        />
      </div>
      <div v-if="hasMore" class="w-[50%] mx-auto text-xs py-1 mt-4 mb-6 text-white bg-zinc-800 dark:bg-purple-700 hover:bg-zinc-700 hover:dark:bg-purple-600 text-center" @click="loadMore()">
        Load more..
      </div>
    </section>
  </div>
</template>