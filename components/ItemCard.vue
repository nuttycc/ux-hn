<script setup lang="ts">
import type { Item } from '~/types/hn';
import { useTimeAgo } from '@vueuse/core'

const props = defineProps<{
  item: Item 
  index: number
}>()

const timeAgo = useTimeAgo(new Date(props.item.time * 1000))
const hostname = props.item.url ? new URL(props.item.url).hostname : 'null'
</script>

<template>
  <div v-if="!item">loading...</div>
  <div v-else class="border p-1 mb-1 flex flex-col ">
    <div class="flex gap-2">
      <span class="text-sm bg-green-600 text-center px-1 h-max ">{{ index + 1 }}</span>
      <span>{{ item?.title }}</span>
    </div>

    <div class="text-sm flex gap-1 items-center">
      <SiteFacicon :domain="hostname" />
      <span>
        {{ hostname }}
      </span>
    </div>
    <div class="flex gap-2 text-sm">
      <span>by {{ item?.by }}</span>
      <p>{{ item?.score }} points</p>
      <NuxtLink :to="`/item/${props?.item?.id}`">{{ item?.descendants }} comments</NuxtLink>
      <span>{{ item?.id }}</span>
      <span>{{ timeAgo }}</span>

    </div>
  </div>
</template>

<style scoped>
a {
  text-decoration: underline;
  transition: color 0.3s ease;
}

a:hover {
  color: blue;
}

</style>