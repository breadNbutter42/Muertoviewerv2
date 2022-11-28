<script setup>
const date = new Date(Date.now())
</script>

<template>
  <div class="relative text-center h-[140px] bg-transparent bg-opacity-50">
    <div class="max-w-[1420px] mx-auto flex justify-between items-center h-full px-4 tracking-tighter text-xs">
      <div class="text-left">
        <div>
          {{ date.getFullYear() }} @ <a href="http://muertoviewer.xyz" target="_blank" class="link transition-all">MuertoViewer</a>
        </div>
        <div>
          built by angrybud.eth
        </div>
        <div class="flex gap-2 items-center mt-1">
          <a href="https://github.com/does1tmatter" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-[16px] transition-all dark:text-white dark:hover:text-black text-black hover:text-white">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="http://twitter.com/angry1bud" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 27 21" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="w-[16px] transition-all dark:text-white dark:hover:text-black text-black hover:text-white">
              <path d="M26.1493 2.48611C25.1985 2.90818 24.1766 3.19243 23.1042 3.32055C24.1992 2.66484 25.0401 1.62583 25.4354 0.387613C24.4114 0.994873 23.2766 1.43633 22.0686 1.67428C21.1026 0.643868 19.7234 0 18.1988 0C14.7759 0 12.2608 3.1935 13.0338 6.50867C8.62911 6.28795 4.72283 4.17761 2.10752 0.970108C0.718574 3.35286 1.38721 6.46991 3.74734 8.04835C2.87951 8.02036 2.06122 7.7824 1.34737 7.3851C1.28923 9.84105 3.04963 12.1387 5.59927 12.6502C4.85311 12.8526 4.03589 12.9 3.20468 12.7406C3.87869 14.8466 5.83614 16.3788 8.15751 16.4218C5.92874 18.1693 3.1207 18.9499 0.30835 18.6183C2.65448 20.1225 5.44207 21 8.4353 21C18.2785 21 23.8396 12.6868 23.5037 5.23062C24.5396 4.48232 25.4386 3.54882 26.1493 2.48611Z" />
            </svg>
          </a>
        </div>
      </div>
      <div class="text-left">
        <Socials :grid="true" />
      </div>
    </div>
  </div>
</template>