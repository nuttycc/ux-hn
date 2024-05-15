<script setup lang="ts">
import type { Item } from '~/types/hn'
import { useTimeAgo } from '@vueuse/core'

const props = defineProps<{
  item: Item
  index: number | string
}>()

const timeAgo = useTimeAgo(new Date(props.item.time * 1000))
const hostname = props.item.url ? new URL(props.item.url).hostname : 'null'



</script>

<template>
  <div v-if="!item">loading...</div>
  <div v-else :id="`${item.id}`" class="item-card border p-1 mb-1 flex flex-col min-h-16 min-w-32">
    <div class="flex gap-2 mb-1 items-baseline">
      <span class="text-sm bg-green-600 text-center px-1 h-max">{{ index }}</span>
      <a :href="item.url" class="font-semibold">{{ item?.title }}</a>
    </div>

    <div class="min-h-8 min-w-16">
      <div class="text-sm flex gap-1 mb-[1px] items-center">
        <SiteFacicon :domain="hostname" />
        <span>{{ hostname }}</span>
        <span>@{{ item?.by }}</span>
      </div>
      <div class="flex gap-2 text-sm">
        <p>{{ item?.score }} points</p>
        <NuxtLink class="underline" :to="`/item/${props?.item?.id}`">{{ item?.descendants }} comments</NuxtLink>
        <span class="hidden">{{ item?.id }}</span>
        <span>{{ timeAgo }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  transition: color 0.3s ease;
}

a:hover {
  color: blue;
}


</style>
