<script setup>
const props = defineProps(['filters'])
const active = ref(false)
const searchInput = ref('')
const selected = useState('selected')
const searchQuery = useState('search')

const { toggleQuery } = useUtils()

const toggleActive = () => active.value = !active.value

const filterTraits = (_traits, _input) => _traits.filter(x => _input ? x.name.toLowerCase().includes(_input.toLowerCase()) : true)

const computedTraits = computed(() => filterTraits(props.filters.traits, searchInput.value))
</script>

<template>
  <div class="mt-2 bg-zinc-100 dark:bg-purple-800 bg-opacity-60 dark:bg-opacity-60 rounded-lg py-2 px-6">
    <div
      class="cursor-pointer uppercase tracking-tighter mt-6 mb-3 rounded-xl flex justify-between"
      @click="toggleActive"
    >
      <div>
        {{ filters.type }}
      </div>
      <div class="flex items-center">
        <div class="text-xs opacity-50">
          {{ filters.count }}
        </div>
        <img
          src="@/assets/img/arrow.svg"
          alt=""
          :class="`w-[24] transition pointer-events-none invert dark:invert-0 ${active ? 'rotate-180' : ''}`"
        />
      </div>
    </div>
    <div
      :class="`w-full max-h-80 ${active ? 'mb-2 p-2 h-80' : 'h-0'} scrollbar transition-all duration-300 bg-zinc-200 dark:bg-purple-600 bg-opacity-80 dark:bg-opacity-20 rounded-lg`"
    >
      <input v-model="searchInput" type="text" placeholder="Search for trait" class="w-full pl-2 text-xs text-black dark:text-white placeholder:dark:text-white/[.4] placeholder:text-black/[.4] py-2 bg-zinc-100 dark:bg-purple-600/[.3] rounded-lg">
      <div
        v-for="(trait, i) in computedTraits"
        :key="i"
        class="flex items-center mt-2 text-[14px] even:bg-zinc-300/[.5] even:dark:bg-purple-800 hover:bg-zinc-100 hover:dark:bg-purple-700 cursor-pointer p-2 rounded-lg"
        @click="toggleQuery(filters.type, trait.name, searchQuery)"
      >
        <input
          v-model="selected[trait.name]"
          type="checkbox"
          :id="`${trait.name}`"
          class="appearance-none rounded-md bg-transparent border border-zinc-500 dark:border-purple-500 p-2 checked:bg-zinc-800 dark:checked:bg-purple-300 pointer-events-none"
        />
        <label :for="`${trait.name}`" class="ml-2 pointer-events-none w-full">{{ trait.name }} <span class="float-right text-xs opacity-50">{{ trait.occurrence }}</span></label>
      </div>
    </div>
  </div>
</template>