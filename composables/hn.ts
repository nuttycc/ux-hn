import type { WritableComputedOptions } from 'vue'
import type { Item } from '~/types/hn'

export interface HnStore {
  items: Record<number, Item>
  comments: Record<number, Item[]>
  feeds: Record<string, Record<number, number[]>>
}

const feedParams = {
  top: 'topstories',
  new: 'newstories',
  best: 'beststories',
  ask: 'askstories',
  show: 'showstories',
  // job: 'jobstories'
}

export const validFeeds = Object.keys(feedParams)

export const useStore = () =>
  useState<HnStore>('hnStore', () => ({
    items: {},
    comments: {},
    feeds: Object.fromEntries(validFeeds.map((feed) => [feed, {}]))
  }))

export async function fetchFeed(feed: string, page: number) {
  const store = useStore()

  const getFeed = () => {
    const ids = store.value.feeds?.[feed]?.[page]
    if (ids?.length) {
      return ids.map((id) => store.value.items[id])
    }
    return undefined
  }
  const setFeed = (items: Item[]) => {
    const ids = items.map((item) => item.id)
    store.value.feeds[feed][page] = ids
    items.forEach((item) => {
      store.value.items[item.id] = item
    })
  }
  return reactiveLoad<Item[]>(
    () => getFeed(),
    (items) => setFeed(items),
    () => $fetch('/api/hn/feed', { params: { feed, page } })
  )
}

export function fetchItem(id: number) {
  const store = useStore()

  const getItem = () => store.value.items[id]
  const setItem = (item: Item) => (store.value.items[id] = item)

  return reactiveLoad<Item>(
    () => getItem(),
    (item) => setItem(item),
    () => $fetch('/api/hn/item', { params: { id } })
  )
}

export function fetchComments(id: number) {
  const store = useStore()

  const getComments = () => store.value.comments[id]
  const setComments = (comments: Item[]) => (store.value.comments[id] = comments)

  return reactiveLoad<Item[]>(
    () => getComments(),
    (comments) => setComments(comments),
    () => $fetch('/api/hn/item', { params: { id } }).then((i) => i.comments)
  )
}

async function reactiveLoad<T>(
  get: () => T | undefined,
  set: (data: T) => void,
  fetch: () => Promise<T>,
  init?: T
) {
  const data = computed({
    get,
    set
  } as WritableComputedOptions<T | undefined>)

  const loading = ref(false)
  
  if (!data.value) {
    if (init != null) {
      data.value = init
    }
  } else {
    loading.value = false
    return reactive({
      loading,
      data
    })
  }

  const task = async () => {
    try {
      loading.value = true
      const fetched = await fetch()
      data.value = fetched
    } catch (e) {
      console.error(e)
      data.value = undefined
    } finally {
      loading.value = false
    }
  }

  if (import.meta.client) {
    task()
  } else {
    await task()
  }

  return reactive({
    loading,
    data
  })
}
