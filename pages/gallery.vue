<script setup>
import logo from '@/assets/img/gallery.png'
const { paginate, generateFilters, filterData, createFilterObject, getMetadata, toggleQuery, fixURL } = useUtils()

const route = useRoute()

const metaToken = computed(() => Number(route.query.id) <= 10000 ? getMetadata({ token: route.query.id }) : null)

const metaAccent = computed(() => {
  if (!metaToken.value) return '#e3e3e6'
  if (metaToken.value.attributes[0].trait_type === 'Background') {
    switch (metaToken.value.attributes[0].value) {
    case 'Light Blue':
      return '#add8e6'
    case 'Light Purple':
      return '#e2d1f9'
    case 'Orange':
      return '#eea47f'
    case 'Purple Sky':
      return '#ba92f1'
    case 'Tosca':
      return '#00a79f'
    case 'Yellow':
      return '#efc050'
    }
  } else if (metaToken.value.attributes[0].trait_type === 'One of One') {
    return '#e3e3e6'
  }
})

const metaTags = computed(() => Number(route.query.id) <= 10000 ? ({
  siteName: `muertoviewer.xyz / gallery / token #${route.query.id}`,
  title: `#${route.query.id} ~ MuertoViewer`,
  image: fixURL(`ipfs://QmeuSEDRnjxtEyk5qBzhpoEmAP6xXSWwXkFtUwoaZCgijZ/${route.query.id}.png`),
  width: '350',
  height: '350',
  imageType: `image/png`,
  desc: `Token #${route.query.id} ~ Los Muertos collection explorer.`,
  url: `https://muertoviewer.xyz/gallery?id=${route.query.id}`,
  twitterImage: `https://yjxomsqunaalrdayrypf.supabase.co/storage/v1/object/public/muertos/${route.query.id}.png`
}) : ({
  siteName: `muertoviewer.xyz / gallery`,
  title: `Gallery ~ MuertoViewer`,
  image: `https://muertoviewer.xyz/${logo}`,
  width: '2039',
  height: '433',
  imageType: `image/png`,
  desc: `Gallery page ~ Los Muertos collection explorer.`,
  url: `https://muertoviewer.xyz/gallery`,
  twitterImage: `https://muertoviewer.xyz/${logo}`
}))

useHead({
  title: 'Gallery - MuertoViewer.xyz',
  meta: [
    { name: 'og:site_name', content: metaTags.value.siteName },
    { name: 'og:title', content: metaTags.value.title },
    { name: 'og:image', content: metaTags.value.image },
    { name: 'og:image:height', content: metaTags.value.height },
    { name: 'og:image:width', content: metaTags.value.width },
    { name: 'og:image:type', content: metaTags.value.imageType },
    { name: 'og:description', content: metaTags.value.desc },
    { name: 'og:url', content: metaTags.value.url },
    { name: 'theme-color', content: metaAccent.value },
    { name: 'twitter:image', content: metaTags.value.twitterImage }
  ]
})

const { data } = await useAsyncData('metadata', () => getMetadata({ all: true }))
const filters = computed(() => generateFilters(data.value) || new Object)
const searchQuery = useState('search', () => createFilterObject(filters.value))

const pageSize = 42
const pageNumber = ref(1)

const filteredData = computed(() => data.value ? filterData(data.value, searchQuery.value) : null)

const computedSize = computed(() => filteredData.value ? filteredData.value.length : data.value ? [...data.value].length : 0)

const paginatedData = ref([])

const scroll = () => {
  if (window) {
    useInfiniteScroll(window, () => {
      pageNumber.value++
      if (paginatedData.value) loadMore()
    }, {
      distance: 100
    })
  }
}

watch(filteredData, () => {
  paginatedData.value = []
  pageNumber.value = 1
  loadMore()
  scroll()
  checkForQuery()
  checkForSelected()
  scrollTo({ top: 0 })
})

const query = ref([])
const selected = useState('selected')

const checkForSelected = () => {
  selected.value = []
  Object.entries(searchQuery.value).forEach(([key, value]) => {
    if (typeof value !== 'string' && value.length) {
      value.forEach(trait => {
        selected.value[trait] = true
      })
    } else if (value.length) {
      selected.value[value] = true
    }
  })
}

const checkForQuery = () => {
  query.value = []
  for (const key in searchQuery.value) {
    if (typeof searchQuery.value[key] !== 'string' && key !== 'id') {
      searchQuery.value[key].forEach(trait => {
        query.value.push({ 'cat': key, 'trait': trait})
      }) 
    }
  }
  if (searchQuery.value.id.length) searchQuery.value.id = Number(searchQuery.value.id)
}

const hasMore = computed(() => Boolean(paginatedData.value.length < computedSize.value.length))

const loadMore = () => paginatedData.value.push(...paginate(filteredData.value, pageSize, pageNumber.value))

onMounted(() => {
  checkForQuery()
  checkForSelected()
  pageNumber.value = 1
  loadMore()
  scroll()
})
</script>

<template>
  <div class="mt-6 md:mt-12 px-4 max-w-[1920px] mx-auto">
    <div class="flex flex-wrap max-w-[500px] sm:max-w-none mx-auto sm:mx-0">
      <GalleryFilters :filters="filters" :size="computedSize" />
      <div class="flex-1 mt-4 md:mt-0">
        <Transition name="slide-button">
          <div v-if="query.length" class="flex flex-wrap gap-4 pb-4 ml-6 overflow-visible">
            <LayoutBadge v-for="(query, i) in query" :key="i" @click="toggleQuery(query.cat, query.trait, searchQuery)">
              {{ query.trait }}
            </LayoutBadge>
          </div>
        </Transition>
        <div>
          <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 px-6 pb-8">
            <NuxtLink v-for="(token, i) in paginatedData" :key="i" :to="`?id=${token.id}`">
              <GalleryItem :data="token" :loading="'eager'" />
            </NuxtLink>
          </div>
          <div v-if="hasMore" class="w-[50%] mx-auto text-xs py-1 mt-4 mb-6 text-white bg-zinc-800 dark:bg-purple-700 hover:bg-zinc-700 hover:dark:bg-purple-600 text-center" @click="loadMore()">
            Load more..
          </div>
        </div>
      </div>
    </div>
  </div>
</template>