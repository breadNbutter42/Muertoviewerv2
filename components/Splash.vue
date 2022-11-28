<script setup>
import gsap from 'gsap'
const { randomNumber, getMetadata } = useUtils()

const { y } = useWindowScroll()
const slowerScroll = computed(() => y.value / 10)

const images = [
  useState('img1', () => getMetadata({ token: randomNumber(1, 10000) })), 
  useState('img2', () => getMetadata({ token: randomNumber(1, 10000) })), 
  useState('img3', () => getMetadata({ token: randomNumber(1, 10000) })), 
  useState('img4', () => getMetadata({ token: randomNumber(1, 10000) })), 
  useState('img5', () => getMetadata({ token: randomNumber(1, 10000) })), 
  useState('img6', () => getMetadata({ token: randomNumber(1, 10000) })), 
]

let timeline

onMounted(() => {
  setTimeout(() => {
    gsap.config({ nullTargetWarn: false })
    timeline = gsap.timeline({ defaults: { duration: 1.3 } })
    timeline.from('#back', { scale: 1.05, filter: 'blur(3px)' }, '+=1')
    timeline.from('.group', { filter: 'blur(3px)' }, '-=1')
  }, 1)
})
</script>

<template>
  <div class="max-w-[1920px] mx-auto px-4">
    <div class="lg:flex lg:justify-center lg:items-center lg:gap-16 xl:gap-32 mt-16 lg:mt-36">
      <div class="grid grid-cols-3 w-full max-w-[350px] lg:max-w-[460px] gap-5 group mx-auto lg:mx-0 shrink-0">
        <div v-for="(token, i) in images" :key="i" :style="{
          transform: `translateY(-${slowerScroll * i}px)`
        }">
          <div data-aos="fade-up" data-aos-delay="700" data-aos-duration="1000" data-aos-mirror="true">
            <NuxtLink :to="`/gallery?id=${token.value.id}`">
              <div class="w-full shadow-xl shadow-black/[.15] dark:shadow-black/[.45] img max-w-[100px] lg:max-w-[150px] h-[200px] lg:h-[250px] bg-cover bg-center rounded-xl group-hover:blur-sm group-hover:hover:blur-0 transition-all -rotate-[6deg]" :style="{
                backgroundImage:  `url('${token.value.image}')`
              }" />
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="max-w-[635px] mx-auto lg:mx-0 text-center lg:text-left mt-16 lg:mt-0 path flex-1" :style="{
        transform: `translateY(-${slowerScroll * 2}px)`
      }">
        <div class="font-architect tracking-[-0.04em] text-black dark:text-purple-300 font-black uppercase">
          <span class="text-[9vw] lg:text-[72px] textshadow">MUERTOVIEWER</span>
          <span class="text-[5vw] md:text-[42px] textshadow">v2</span>
        </div>
        <div class="text-justify text-zinc-100 dark:text-purple-100 mt-8">
          <figure>
            <blockquote class="italic bg-zinc-700 dark:bg-purple-700 p-4">
              <q>Los Muertos World is built to serve its members. We are a highly experienced team with wildly ambitious goals.
                We are upcoming digital artists, we are web3 nerds, we are community builders. We are Muerto!</q>
            </blockquote>
            <figcaption class="text-xs text-right italic text-zinc-800 dark:text-purple-100">
              — <a href="https://www.los-muertos.io/" target="_blank" class="text-black dark:text-white hover:text-zinc-400 hover:dark:text-purple-400 transition-all">www.Los-Muertos.io</a>
            </figcaption>
          </figure>
          <div class="mt-12 text-center lg:text-right overflow-visible pb-2">
            <NuxtLink to="/gallery">
              <button class="
                ml-4
                leading-none
                font-architect
                uppercase
                text-[50px]
                text-black
                hover:text-white
                dark:text-purple-300
                hover:dark:text-purple-100
                transition-all
                textshadow
                tracking-[-0.1em]
                font-black
              ">
                Explore ->
              </button>
            </NuxtLink>
          </div>
          <Socials />
        </div>
      </div>
    </div>
  </div>
</template>