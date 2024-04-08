import { HN_BASE_URL } from '~/server/constants'
import { Item } from '~/types/hn'

interface CacheItem extends Item {
  createdAt: number // 秒
}

export async function fetchItem(id: number, withComments: boolean = false): Promise<Item> {
  const item: Item = await $fetch(`${HN_BASE_URL}/item/${id}.json`)
  item.kids = item?.kids || []

  return {
    ...item,
    comments: withComments
      ? await Promise.all(item.kids.map((id: number) => fetchItem(id, true)))
      : []
  }
}

// 添加缓存
export default defineEventHandler(async (event) => {
  const { id } = getQuery(event) as { id: string }

  if (!id) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Must provide a item id.'
    })
  }
  if (Number.isNaN(+id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Item ID must be a number, but got: ' + id
    })
  }

  const now = Math.round(Date.now() / 1000)
  const cache = (await useStorage().getItem(id)) as CacheItem | undefined
  if (cache && cache.createdAt + 10 * 60 > now) {
    console.log('☑️ item use cache!')
    return cache
  }

  const item = await fetchItem(+id, true)
  await useStorage().setItem(id, { ...item, createdAt: now })
  return item
})
