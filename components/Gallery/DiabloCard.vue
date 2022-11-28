<script setup>
const active = ref(false)
const selected = useState('selected')
const searchQuery = useState('search')

const { toggleQuery } = useUtils()

const diabloTraits = [
  {
    trait_type: 'Mask',
    traits: [
      { name: 'Diablo', occurrence: 35 }
    ]
  },
  {
    trait_type: 'Body',
    traits: [
      { name: 'The Pink Devil', occurrence: 16 },
      { name: 'The Blue Devil', occurrence: 11 },
      { name: 'The Fiery Devil', occurrence: 3 },
    ]
  },
  {
    trait_type: 'One of One',
    traits: [
      { name: 'Old Nick', occurrence: 1 }
    ]
  }
]

const toggleActive = () => active.value = !active.value
</script>

<template>
  <div class="mt-2 bg-red-500 dark:bg-red-600 bg-opacity-80 dark:bg-opacity-80 text-white rounded-lg py-2 px-6">
    <div
      class="cursor-pointer uppercase tracking-tighter mt-6 mb-3 rounded-xl flex justify-between"
      @click="toggleActive"
    >
      <div>
        Diablo Traits
      </div>
      <div class="flex items-center">
        <div class="text-xs">
          5
        </div>
        <img
          src="@/assets/img/arrow.svg"
          alt=""
          :class="`w-[24] transition pointer-events-none ${active ? 'rotate-180' : ''}`"
        />
      </div>
    </div>
    <div
      :class="`w-full max-h-64 ${active ? 'mb-2 p-2 h-[245px]' : 'h-0'} scrollbar transition-all duration-300 bg-red-200 bg-opacity-50 dark:bg-opacity-50 dark:bg-red-800 px-4 rounded-lg`"
    >
      <div v-for="(diablo, id) in diabloTraits" :key="id">
        <div v-for="trait in diablo.traits" :key="trait.name" :class="`flex items-center mt-2 text-[14px] ${ diablo.trait_type === 'Body' ? 'odd:bg-red-200/[.5] odd:dark:bg-red-900/[.3]' : ''} hover:bg-red-300 hover:dark:bg-red-700 cursor-pointer p-2 rounded-lg`" @click="toggleQuery(diablo.trait_type, trait.name, searchQuery)">
          <input
            v-model="selected[trait.name]"
            :id="`diablo${trait.name}`"
            type="checkbox"
            class="appearance-none rounded-md bg-transparent pointer-events-none border border-red-500 dark:border-red-500 p-2 checked:bg-red-500 dark:checked:bg-red-500"
          />
          <label :for="`diablo${trait.name}`" class="ml-2 pointer-events-none w-full"><span class="uppercase">{{ diablo.trait_type }}</span>: {{ trait.name }} <span class="float-right text-xs opacity-70">{{ trait.occurrence  }}</span></label>
        </div>
    </div>
    </div>
  </div>
</template>