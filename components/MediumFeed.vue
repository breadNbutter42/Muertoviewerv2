<script setup>
const { pending, data } = await useLazyFetch('/api/medium-feed')

const summarize = (text) => `${text.slice(0, 320)}...`
</script>

<template>
  <div id="medium" class="mt-12 xl:max-w-[1300px] mx-auto pb-16">
    <div class="text-black textshadow dark:text-purple-300 transition-all font-black text-[10vw] md:text-6xl uppercase leading-none font-architect tracking-[-0.02em] text-center lg:text-left lg:ml-8">
      Medium Feed
    </div>
    <Transition name="galleryAnim">
      <div v-if="pending" class="mt-12 pb-16 flex justify-center ">
        <UtilsLoader />
      </div>
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-y-16 gap-x-12 mt-12">
        <div data-aos="zoom-out-up" v-for="i in 6" :key="i" class="max-w-[600px] mx-auto max-h-[250px]">
          <div
            v-if="data[i-1]"
            class="
              relative 
              mb-[20px]
              bg-zinc-100/[.5]
              dark:bg-purple-800 
              p-4 rounded-xl 
              shadow-xl 
              shadow-black/[.15] 
              dark:shadow-black/[.45]
              mt-16
              first-of-type:mt-0
              xl:mt-0
          ">
            <img
              src="https://miro.medium.com/fit/c/176/176/1*IP_KDsjqaD_nJdvSvxpN8w.jpeg"
              class="
                absolute
                -top-[30px] 
                -right-[10px] 
                w-[70px] 
                rounded-lg 
                shadow-lg 
                shadow-black/[.15] 
                dark:shadow-black/[.45]
            ">
            <h2 class="text-xl uppercase tracking-tighter">
              <a :href="data[i-1].link" target="_blank" class="transition-all text-zinc-400 dark:text-purple-400 hover:text-black hover:dark:text-white">{{ data[i-1].title }}</a>
            </h2>
            <div v-html="data[i-1]['content:encodedSnippet']" class="mt-2 whitespace-pre-wrap truncate h-[125px]" />
            <div class="mt-4 flex text-xs sm:text-sm">
              <div class="italic text-zinc-400 dark:text-purple-400">
                —by <a href="https://medium.com/@losmuertos" target="_blank" class="text-black dark:text-white hover:text-zinc-400 hover:dark:text-purple-400 transition-all">{{ data[i-1].creator }}</a> <br> {{ data[i-1].pubDate }}
              </div>
              <div class="text-right flex-1 dark:text-purple-400">
                <a :href="data[i-1].link" target="_blank" class="transition-all text-black dark:text-white hover:text-zinc-400 hover:dark:text-purple-400">Read more...</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <div v-if="data && data.length > 6" class="text-right mr-4">
      <a href="https://medium.com/@losmuertos" target="_blank" rel="noopener noreferrer">
        <LayoutMyButton>
          View all articles...
        </LayoutMyButton>
      </a>
    </div>
  </div>
</template>