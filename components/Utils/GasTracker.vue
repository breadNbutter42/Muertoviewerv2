<script setup>
const { data, refresh } = useFetch('/api/gas-price')

let interval

onMounted(() => {
  interval = setInterval(() => refresh(), 10000)
})

onUnmounted(() => clearInterval(interval))
</script>

<template>
  <div class="text-center pointer-events-none flex justify-center items-center">
    <span class="text-[10px] text-zinc-500 dark:text-purple-500 bg-zinc-100/[.5] dark:bg-purple-500/[.2] py-[1px] px-2 uppercase rounded-t-[3px]">{{ data }} GWEI</span>
  </div>
</template>
