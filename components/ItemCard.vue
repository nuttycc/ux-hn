<script setup lang="ts">
import type { Item } from '~/types/hn';
import { useTimeAgo } from '@vueuse/core'

const props = defineProps<{
  item: Item 
}>()

const timeAgo = useTimeAgo(new Date(props.item.time * 1000))
const hostname = new URL(props.item.url || '').hostname 
</script>

<template>
  <div v-if="!item">loading...</div>
  <div v-else class="border p-1 mb-1">
    <p>{{ item?.title }}</p>
    <div class="text-sm">
      {{ hostname }}
    </div>
    <div class="flex gap-2 text-sm">
      <p>{{ timeAgo }}</p>
      <p>{{ item?.id }}</p>
      <p>{{ item?.by }}</p>
      <p>{{ item?.score }} points</p>
      <NuxtLink :to="`/item/${props?.item?.id}`">{{ item?.descendants }} comments</NuxtLink>
    </div>
  </div>
</template>