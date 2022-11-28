<template>
  <button class="
    disabled:cursor-not-allowed
    disabled:opacity-60
    text-zinc-800
    dark:text-white
    disabled:hover:bg-zinc-300
    dark:disabled:hover:bg-purple-600
    bg-zinc-100/[.5]
    dark:bg-purple-700
    active:bg-zinc-100/[.5]
    dark:active:bg-purple-500
    rounded-lg
    py-2
    px-[10px]
    hover:bg-zinc-100
    dark:hover:bg-purple-600
    transition-all
    shadow-lg
  ">
    <slot />
  </button>
</template>