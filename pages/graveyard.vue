<script setup>
import graveImg from '@/assets/img/graveyard.png'

const nftAddress = useRuntimeConfig().public.CONTRACT_ADDR
const stakingAddress = useRuntimeConfig().public.STAKING_ADDR


useHead({
  title: 'Graveyard - MuertoViewer.xyz',
  meta: [
    { name: 'og:site_name', content: `muertoviewer.xyz / graveyard` },
    { name: 'og:title', content: `Graveyard - MuertoViewer` }
  ]
})

const { ownedTokens, userLoading, unstakedBalance, isAuthenticated } = useUser()
const { sliceAddress } = useUtils()
const { isMetamaskInstalled } = useWallet()

const { contractLoaded, contractLoading, stakedBalance, isApproved, staked, setApprove } = useContract()

const selectedTokens = useState('selectedTokens', () => ({ tokens: [] }))
</script>

<template>
  <div class="mt-8 lg:mt-24 max-w-[1920px] mx-auto px-4">
    <section class="lg:flex max-w-[1100px] mx-auto gap-16">
      <img data-aos="zoom-in-up" :src="graveImg" class="w-full max-w-[500px] shadow-xl shadow-black/[.3] rounded-3xl sm:rounded-[50px] mx-auto lg:mx-none" alt="Los Muertos World Graveyard">
      <div data-aos="zoom-in-up" class="flex-1 w-full flex flex-col gap-4 justify-center items-center lg:items-start min-h-full text-center lg:text-left">
        <div class="flex-1 w-full flex flex-col justify-center mt-12 lg:mt-0">
          <div>
            <div class="text-black textshadow dark:text-purple-300 transition-all font-black text-[10vw] md:text-6xl uppercase leading-none font-architect tracking-[-0.02em]">
              Graveyard
            </div>
            <div class="
              relative
              mt-4
              bg-zinc-100/[.5]
              dark:bg-purple-800 
              p-4 rounded-xl 
              shadow-xl 
              shadow-black/[.15] 
              dark:shadow-black/[.45]
              overflow-hidden
              text-sm
            ">
              <div class="text-justify">
                The Graveyard is our way to reward loyal holders with benefits in a hassle-free, automatic and secure environment.
              </div>
              <div class="text-justify mt-2">
                Bury your Muerto's in The Graveyard to access member benefits
              </div>
              <div v-if="isMetamaskInstalled" class="relative mt-4 text-xs text-left mx-auto lg:mx-0">
                <Transition name="slide-button">
                  <div v-if="!contractLoading && !userLoading">
                    <div>
                      Current buried supply: <span class="float-right">{{ staked.toLocaleString() }}</span>
                    </div>
                    <div v-if="isAuthenticated">
                      <div>
                        My owned tokens: <span class="float-right">{{ ownedTokens?.length }}</span>
                      </div>
                      <div>
                        My buried tokens: <span class="float-right">{{ stakedBalance?.length }}</span>
                      </div>
                      <div>
                        Tokens available to bury: <span class="float-right">{{ unstakedBalance?.length }}</span>
                      </div>
                    </div>
                  </div>
                  <div v-else-if="contractLoading || userLoading" class="flex justify-center">
                    <UtilsLoader />
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>
        <div data-aos="zoom-in-down" v-if="isAuthenticated && !userLoading" class="text-[10px] mb-8 leading-none flex items-center gap-2">
          <Transition name="slide-button">
            <template v-if="isApproved">
              <LayoutMyButton class="text-xs" @click="setApprove(stakingAddress, false)">
                Revoke
              </LayoutMyButton>
            </template>
            <template v-else-if="!isApproved">
              <LayoutMyButton class="text-xs" @click="setApprove(stakingAddress, true)">
                Approve
              </LayoutMyButton>
            </template>
          </Transition>
          <div>
            <Transition name="slide-button">
              <template v-if="isApproved">
                <div class="flex items-center gap-[2px]">
                  <div>
                    Approval status
                  </div> 
                  <div class="text-green-500">
                    <svg viewBox="0 0 20 20" fill="none" class="w-3" xmlns="http://www.w3.org/2000/svg">
                      <rect x="4" y="5" width="12" height="10" fill="white"/>
                      <path d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0V0ZM14.3 7.61L9.73 13.61C9.63685 13.731 9.51721 13.8291 9.38027 13.8967C9.24333 13.9643 9.09272 13.9996 8.94 14C8.78811 14.0008 8.63803 13.967 8.50115 13.9012C8.36426 13.8353 8.24418 13.7392 8.15 13.62L5.71 10.51C5.62924 10.4063 5.5697 10.2876 5.53479 10.1609C5.49988 10.0341 5.49027 9.90172 5.50652 9.77126C5.52277 9.64079 5.56456 9.5148 5.6295 9.40049C5.69444 9.28617 5.78126 9.18576 5.885 9.105C6.09453 8.94189 6.36026 8.8687 6.62375 8.90152C6.75421 8.91777 6.8802 8.95955 6.99452 9.02449C7.10884 9.08943 7.20924 9.17626 7.29 9.28L8.92 11.36L12.7 6.36C12.7801 6.25494 12.8801 6.16669 12.9943 6.10029C13.1086 6.03388 13.2347 5.99062 13.3657 5.97298C13.4966 5.95534 13.6297 5.96365 13.7574 5.99746C13.8851 6.03126 14.0049 6.08989 14.11 6.17C14.2151 6.25011 14.3033 6.35012 14.3697 6.46433C14.4361 6.57855 14.4794 6.70472 14.497 6.83565C14.5147 6.96658 14.5063 7.0997 14.4725 7.22742C14.4387 7.35514 14.3801 7.47494 14.3 7.58V7.61Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="flex items-center gap-[2px]">
                  <div>
                    Approval status
                  </div> 
                  <div class="text-red-500">
                    <svg viewBox="0 0 24 24" class="w-3" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="7" y="7" width="10" height="10" fill="white"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1C5.925 1 1 5.925 1 12C1 18.075 5.925 23 12 23C18.075 23 23 18.075 23 12C23 5.925 18.075 1 12 1ZM15.707 9.707C15.8892 9.5184 15.99 9.2658 15.9877 9.0036C15.9854 8.7414 15.8802 8.49059 15.6948 8.30518C15.5094 8.11977 15.2586 8.0146 14.9964 8.01233C14.7342 8.01005 14.4816 8.11084 14.293 8.293L12 10.586L9.707 8.293C9.61475 8.19749 9.50441 8.12131 9.3824 8.0689C9.2604 8.01649 9.12918 7.9889 8.9964 7.98775C8.86362 7.9866 8.73194 8.0119 8.60905 8.06218C8.48615 8.11246 8.3745 8.18671 8.28061 8.28061C8.18671 8.3745 8.11246 8.48615 8.06218 8.60905C8.0119 8.73194 7.9866 8.86362 7.98775 8.9964C7.9889 9.12918 8.01649 9.2604 8.0689 9.3824C8.12131 9.50441 8.19749 9.61475 8.293 9.707L10.586 12L8.293 14.293C8.19749 14.3852 8.12131 14.4956 8.0689 14.6176C8.01649 14.7396 7.9889 14.8708 7.98775 15.0036C7.9866 15.1364 8.0119 15.2681 8.06218 15.391C8.11246 15.5139 8.18671 15.6255 8.28061 15.7194C8.3745 15.8133 8.48615 15.8875 8.60905 15.9378C8.73194 15.9881 8.86362 16.0134 8.9964 16.0123C9.12918 16.0111 9.2604 15.9835 9.3824 15.9311C9.50441 15.8787 9.61475 15.8025 9.707 15.707L12 13.414L14.293 15.707C14.4816 15.8892 14.7342 15.99 14.9964 15.9877C15.2586 15.9854 15.5094 15.8802 15.6948 15.6948C15.8802 15.5094 15.9854 15.2586 15.9877 14.9964C15.99 14.7342 15.8892 14.4816 15.707 14.293L13.414 12L15.707 9.707Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
              </template>
            </Transition>
            <div class="italic">
              <span class="opacity-40">Contract address:</span> <a :href="`http://etherscan.io/address/${stakingAddress}`" target="_blank" class="opacity-40 hover:opacity-100 transition-all">{{ sliceAddress(stakingAddress, 6) }}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <Transition name="galleryAnim">
        <template v-if="userLoading">
          <div class="bg-zinc-100/[.3] dark:bg-purple-800/[.5] p-6 rounded-xl mt-8 lg:mt-16 mb-8">
            <UtilsLoader class="justify-center" />
          </div>
        </template>
        <template v-else-if="isAuthenticated && !userLoading">
          <div>
            <Staking data-aos="zoom-in-down" :staked="[...stakedBalance]" :unstaked="[...unstakedBalance]" />
          </div>
        </template>
        <template v-else-if="!isAuthenticated && !userLoading">
          <div class="bg-zinc-100/[.3] dark:bg-purple-800/[.5] p-6 rounded-xl mt-8 lg:mt-16 mb-8 text-center">
            Connect to view the graveyard
          </div>
        </template>
      </Transition>
    </section>
  </div>
</template>