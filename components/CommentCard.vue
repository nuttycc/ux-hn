<!-- eslint-disable vue/no-v-html -->
<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import type { Item } from '~/types/hn'

const props = defineProps<{
  comment: Item
  deep: number
}>()

const timeAgo = useTimeAgo(new Date(props.comment.time * 1000))

const borderColor = [
  'border-[color:oklch(80%,0.1,15)]',
  'border-[color:oklch(80%,0.1,75)]',
  'border-[color:oklch(80%,0.1,135)]',
  'border-[color:oklch(80%,0.1,195)]',
  'border-[color:oklch(80%,0.1,255)]',
  'border-[color:oklch(80%,0.1,315)]'
]
</script>

<template>
  <div class="text-sm">
    <article
      v-if="!props.comment.dead && !$props.comment.deleted"
      :class="`p-2 border-l-2 ${borderColor[deep]}`"
    >
      <header class="text-xs mb-1 flex gap-2 dark:text-gray-400 border-b dark:border-b-gray-500">
        <h3>@{{ props.comment?.by }}</h3>
        <span>{{ comment?.id }}</span>
        <time>{{ timeAgo }}</time>
      </header>
      <div class="text flex flex-col gap-2 indent-4 break-words text-wrap" v-html="props.comment?.text"/>
    </article>
    <div v-if="comment?.comments" class="ml-4">
      <CommentList :comments="comment.comments" :deep="deep + 1" />
    </div>
  </div>
</template>
