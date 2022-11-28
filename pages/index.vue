<script setup>
import grave from '@/assets/img/cave.png'

const { y } = useWindowScroll()
const slowerScroll = computed(() => y.value / 10)
</script>

<template>
  <div class="mt-16 max-w-[1920px] mx-auto px-4">
    <Splash class="mb-24" />
    <div data-aos="fade-up" data-aos-duration="1000" data-aos-mirror="true">
      <NuxtLink to="/graveyard" class="
        block
        bg-center
        bg-cover
        opacity-80
        hover:opacity-100
        transition-opacity
        duration-500
        w-full
        max-w-[1200px]
        min-h-[150px]
        md:min-h-[200px]
        relative
        shadow-xl
        shadow-black/[.4]
        rounded-3xl
        mx-auto" :style="{
          backgroundImage: `url('${grave}')`,
          transform: `translateY(-${slowerScroll}px)`
        }">
        <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center textshadow pointer-events-none text-black text-[10vw] sm:text-[48px] md:text-[62px] lg:text-[92px] font-architect">
          Enter graveyard
        </div>
      </NuxtLink>
    </div>
    <MediumFeed />
  </div>
</template>
