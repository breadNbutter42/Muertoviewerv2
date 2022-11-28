
export default function () {

  const router = useRouter()
  const route = useRoute()

  const showBox = computed(() => Boolean(activeToken.value))
  const activeToken = useState('activeToken', () => null)

  const openBox = (id) => activeToken.value = id

  const closeBox = () => {
    activeToken.value = null
    router.push({ query: {} })
  }

  const checkForModal = () => Number(route.query.id) <= 10000 ? openBox(route.query.id) : closeBox()

  return {
    showBox,
    openBox,
    closeBox,
    checkForModal
  }
}