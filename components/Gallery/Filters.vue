<script setup>
const props = defineProps(['filters', 'size'])

const searchQuery = useState('search')

const isFiltering = computed(() => Object.values(searchQuery.value).filter((value) => value?.length !== 0))

const tokenId = useState('galleryToken', () => null)

watch(tokenId, (newValue) => {
  if (window) window.scrollY = 0
  if (!newValue) searchQuery.value.id = []
  if (newValue) searchQuery.value.id = tokenId.value
})

const resetAllFilters = () => {
  tokenId.value = null
  for (const key in searchQuery.value) searchQuery.value[key] = []
  selected.value = []
}

const resetId = () => tokenId.value = null

const selected = useState('selected', () => [])

const mobileOpen = useState('mobileOpen', () => false)

const toggleMobile = () => mobileOpen.value = !mobileOpen.value

onUnmounted(() => resetAllFilters())
</script>

<template>
  <div class="w-full md:sticky md:max-w-[320px] top-0 md:max-h-screen scrollbar-lightbox">
    <!-- PC FILTERS -->
    <div class="hidden md:block">
      <div class="flex gap-1 justify-between pl-4 overflow-visible bg-zinc-100 dark:bg-purple-800 bg-opacity-60 dark:bg-opacity-60 rounded-lg p-4">
        <div>
          <div class="uppercase text-[10px] dark:text-purple-100 font-normal">
            Filter by ID
          </div>
          <div class="flex items-center">
            <input
              v-model="tokenId"
              type="number"
              min="1"
              max="10000"
              class="border border-zinc-500 dark:border-purple-300 rounded-md py-1 pl-2 text-[12px] bg-transparent appearance-none text-center"
            />
            <div v-if="tokenId" class="cursor-pointer inline-block text-black dark:text-purple-400 fill-current" @click="resetId">
              <svg width="24px" height="24px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9584 4.25H12.0416C13.4108 4.24999 14.4957 4.24999 15.3621 4.33812C16.2497 4.42841 16.9907 4.61739 17.639 5.05052C18.1576 5.39707 18.6029 5.84239 18.9495 6.36104C19.3826 7.00926 19.5716 7.7503 19.6619 8.63794C19.75 9.5043 19.75 10.5892 19.75 11.9584V12.0416C19.75 13.4108 19.75 14.4957 19.6619 15.3621C19.5716 16.2497 19.3826 16.9907 18.9495 17.639C18.6029 18.1576 18.1576 18.6029 17.639 18.9495C16.9907 19.3826 16.2497 19.5716 15.3621 19.6619C14.4957 19.75 13.4108 19.75 12.0416 19.75H11.9584C10.5892 19.75 9.5043 19.75 8.63794 19.6619C7.7503 19.5716 7.00926 19.3826 6.36104 18.9495C5.84239 18.6029 5.39707 18.1576 5.05052 17.639C4.61739 16.9907 4.42841 16.2497 4.33812 15.3621C4.24999 14.4957 4.24999 13.4108 4.25 12.0416V11.9584C4.24999 10.5892 4.24999 9.5043 4.33812 8.63794C4.42841 7.7503 4.61739 7.00926 5.05052 6.36104C5.39707 5.84239 5.84239 5.39707 6.36104 5.05052C7.00926 4.61739 7.7503 4.42841 8.63794 4.33812C9.5043 4.24999 10.5892 4.24999 11.9584 4.25ZM14.5303 9.46967C14.8232 9.76256 14.8232 10.2374 14.5303 10.5303L13.0607 12L14.5303 13.4697C14.8232 13.7626 14.8232 14.2374 14.5303 14.5303C14.2374 14.8232 13.7626 14.8232 13.4697 14.5303L12 13.0607L10.5303 14.5303C10.2374 14.8232 9.76256 14.8232 9.46967 14.5303C9.17678 14.2374 9.17678 13.7626 9.46967 13.4697L10.9393 12L9.46967 10.5303C9.17678 10.2374 9.17678 9.76256 9.46967 9.46967C9.76256 9.17678 10.2374 9.17678 10.5303 9.46967L12 10.9393L13.4697 9.46967C13.7626 9.17678 14.2374 9.17678 14.5303 9.46967Z"/>
              </svg>
            </div>
          </div>
        </div>
        <div
          class="text-[10px] uppercase -mt-1 text-zinc-200 dark:text-purple-200 tracking-normal font-normal self-end mb-1 overflow-visible"
        >
          <Transition name="resetButton">
            <div
              v-if="isFiltering.length"
              class="cursor-pointer inline bg-zinc-800 hover:bg-zinc-600 dark:bg-purple-700 hover:dark:bg-purple-600 transition-all text-white p-1 rounded-md mr-1"
              @click="resetAllFilters"
            >
              Reset filters
            </div>
          </Transition>
          <div class="text-zinc-500 dark:text-purple-100 mt-1 text-center">
            {{ size }} Results
          </div>
        </div>
      </div>
      <GalleryCard v-for="(traits, key, indx) in filters" :key="indx" :filters="{ type: key, traits: traits, count: traits.length }" />
      <GalleryDiabloCard />
    </div>
    <!-- PC FILTERS END -->
    <!-- MOBILE FILTERS -->
    <div class="block md:hidden px-6">
      <div class="flex gap-1 justify-between pl-4 overflow-visible bg-zinc-100 dark:bg-purple-800 bg-opacity-70 dark:bg-opacity-70 rounded-lg p-4">
        <div>
          <div class="uppercase text-[10px] dark:text-purple-100 font-normal">
            Filter by ID
          </div>
          <div class="flex items-center">
            <input
              v-model="tokenId"
              type="number"
              min="1"
              max="10000"
              class="border border-zinc-500 dark:border-purple-300 rounded-md py-1 pl-2 text-[12px] bg-transparent appearance-none text-center"
            />
            <div v-if="tokenId" class="cursor-pointer inline-block text-black dark:text-purple-400 fill-current" @click="resetId">
              <svg width="24px" height="24px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9584 4.25H12.0416C13.4108 4.24999 14.4957 4.24999 15.3621 4.33812C16.2497 4.42841 16.9907 4.61739 17.639 5.05052C18.1576 5.39707 18.6029 5.84239 18.9495 6.36104C19.3826 7.00926 19.5716 7.7503 19.6619 8.63794C19.75 9.5043 19.75 10.5892 19.75 11.9584V12.0416C19.75 13.4108 19.75 14.4957 19.6619 15.3621C19.5716 16.2497 19.3826 16.9907 18.9495 17.639C18.6029 18.1576 18.1576 18.6029 17.639 18.9495C16.9907 19.3826 16.2497 19.5716 15.3621 19.6619C14.4957 19.75 13.4108 19.75 12.0416 19.75H11.9584C10.5892 19.75 9.5043 19.75 8.63794 19.6619C7.7503 19.5716 7.00926 19.3826 6.36104 18.9495C5.84239 18.6029 5.39707 18.1576 5.05052 17.639C4.61739 16.9907 4.42841 16.2497 4.33812 15.3621C4.24999 14.4957 4.24999 13.4108 4.25 12.0416V11.9584C4.24999 10.5892 4.24999 9.5043 4.33812 8.63794C4.42841 7.7503 4.61739 7.00926 5.05052 6.36104C5.39707 5.84239 5.84239 5.39707 6.36104 5.05052C7.00926 4.61739 7.7503 4.42841 8.63794 4.33812C9.5043 4.24999 10.5892 4.24999 11.9584 4.25ZM14.5303 9.46967C14.8232 9.76256 14.8232 10.2374 14.5303 10.5303L13.0607 12L14.5303 13.4697C14.8232 13.7626 14.8232 14.2374 14.5303 14.5303C14.2374 14.8232 13.7626 14.8232 13.4697 14.5303L12 13.0607L10.5303 14.5303C10.2374 14.8232 9.76256 14.8232 9.46967 14.5303C9.17678 14.2374 9.17678 13.7626 9.46967 13.4697L10.9393 12L9.46967 10.5303C9.17678 10.2374 9.17678 9.76256 9.46967 9.46967C9.76256 9.17678 10.2374 9.17678 10.5303 9.46967L12 10.9393L13.4697 9.46967C13.7626 9.17678 14.2374 9.17678 14.5303 9.46967Z"/>
              </svg>
            </div>
          </div>
        </div>
        <div
          class="text-[10px] uppercase -mt-1 text-zinc-200 dark:text-purple-200 tracking-normal font-normal self-end mb-1 overflow-visible"
        >
          <Transition name="resetButton">
            <div
              v-if="isFiltering.length"
              class="cursor-pointer inline bg-zinc-800 hover:bg-zinc-600 dark:bg-purple-700 hover:dark:bg-purple-600 transition-all text-white p-1 rounded-md mr-1"
              @click="resetAllFilters"
            >
              Reset filters
            </div>
          </Transition>
          <div class="text-zinc-500 dark:text-purple-100 mt-1 text-center">
            {{ size }} Results
          </div>
        </div>
      </div>
      <button class="text-white fill-current flex bg-zinc-800 dark:bg-purple-700 p-2 rounded-lg text-xs cursor-pointer mt-2 float-right" @click.self="toggleMobile">
        <svg width="16px" viewBox="0 0 200 200" fill="currentColor" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><title/><path d="M36.5,75C41,89.5,54,100,70,100s29-10.5,33.5-25H170a10,10,0,0,0,0-20H103.5C99,40.5,86,30,70,30S41,40.5,36.5,55H25a10,10,0,0,0,0,20ZM70,50A15,15,0,1,1,55,65,14.73,14.73,0,0,1,70,50Zm105,75H163.5C159,110.5,146,100,130,100s-29,10.5-33.5,25H30a10,10,0,0,0,0,20H96.5c4.5,14.5,17.5,25,33.5,25s29-10.5,33.5-25H175a10,10,0,0,0,0-20Zm-45,25a15,15,0,1,1,15-15A14.73,14.73,0,0,1,130,150Z"/></svg>
        FILTERS
      </button>
      <Transition name="slide-profile">
        <div v-if="mobileOpen" class="fixed top-0 left-0 z-[1000] min-h-screen w-[100vw] bg-black bg-opacity-40 backdrop-blur-sm scrollbar" @click.self="toggleMobile">
          <div class="absolute top-0 left-0 w-full p-12" @click.self="toggleMobile">
            <GalleryCard v-for="(traits, key, indx) in filters" :key="indx" :filters="{ type: key, traits, count: traits.length }" />
            <GalleryDiabloCard />
          </div>
        </div>
      </Transition>
    </div>
    <!-- MOBILE FILTERS END -->
  </div>
</template>