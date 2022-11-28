<template>
  <div class="flex gap-2 items-center">
    <div class="pl-4">
      <NuxtLink to="/" class="text-black hover:text-white dark:text-purple-300 dark:hover:text-purple-100 transition-all font-black uppercase leading-none font-architect tracking-[-0.02em] textshadow">
        <span class="text-[4vw] md:text-3xl">MUERTOVIEWER</span>
        <span class="text-[2vw] md:text-lg">v2</span>
      </NuxtLink>
      <div class="text-center text-[9px] leading-none text-zinc-400 dark:text-purple-100 hidden sm:flex justify-center gap-2 -mt-1">
        <div>
          [UNOFFICIAL]
        </div>
        <div class="uppercase">
          built by <a href="http://twitter.com/angry1bud" target="_blank" class="link text-black dark:text-white transition-all">angrybud.eth</a>
        </div>
      </div>
    </div>
    <UtilsGasTracker class="fixed bottom-0 opacity-80" />
  </div>
</template>