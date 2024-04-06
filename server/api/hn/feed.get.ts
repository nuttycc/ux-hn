// feeds.get.ts
// feed: {top: "topStories", newst:"newest", "best":"best", "ask":"ask", "show":"show", "job":"job"}

import { HN_BASE_URL, NumberPerPage } from "~/server/constants"
import { fetchItem } from "./item.get"

const feedParams = {
  top: "topstories",
  new: "newstories",
  best: "beststories",
  ask: "askstories",
  show: "showstories",
  job: "jobstories"
}

// id  item  comments

async function fetchFeed(feed: keyof typeof feedParams, page: number=1, withComments: boolean=false): Promise<any[]> {
  const ids = await $fetch(`${HN_BASE_URL}/${feedParams[feed]}.json`) as number[]
  const start = (page - 1) * NumberPerPage
  const end = page * NumberPerPage
  const items = await Promise.all(ids.slice(start, end).map((id: number) => fetchItem(id, withComments))) 

  return items
}

export default defineEventHandler(async (event) => {
  const { feed="top", page="1", withComments=false } = getQuery(event) as { feed?: keyof typeof feedParams, page?: string, withComments?: boolean }
  
  if (!feed) {
    throw createError({
      statusCode: 422,
      statusMessage: "Must provide a feed type."
    })
  }
  if (!feedParams[feed]) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Feed type must be one of: ' + Object.keys(feedParams).join(', ')
    })
  }
  const key = `${feed}-${page}-${withComments}`
  const now = Math.round(Date.now() / 1000)
  const cache = await useStorage().getItem(key) as { items: any[], createdAt: number } | undefined
  if (cache && cache.createdAt + 10*60 > now) {
    console.log('☑️ feed use cache')
    return cache.items
  }

  const items = await fetchFeed(feed, Number(page) || 1, withComments)
  await useStorage().setItem(key, { items, createdAt: now })
  return items
})