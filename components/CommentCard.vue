<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core';
import type { Item } from '~/types/hn';


const props = defineProps<{
  comment: Item,
  deep: number
}>()

const timeAgo = useTimeAgo(new Date(props.comment.time * 1000))


const borderColor = [
  'border-[color:oklch(80%,0.1,15)]',
  'border-[color:oklch(80%,0.1,75)]',
  'border-[color:oklch(80%,0.1,135)]',
  'border-[color:oklch(80%,0.1,195)]',
  'border-[color:oklch(80%,0.1,255)]',
  'border-[color:oklch(80%,0.1,315)]',
]
</script>

<template>
  <div>
    <article :class="`p-2 leading-7 border-l-2 ${borderColor[deep]}`">
      <header class="flex gap-2">
        <h3>{{ props.comment?.by }}</h3>
        <span>{{ comment?.id }}</span>
        <time>{{ timeAgo }}</time>
        <span>{{ deep }}</span>
      </header>
      <div v-html="props.comment?.text" class="flex flex-col gap-3"></div>
    </article>
    <div v-if="comment?.comments" class="ml-4">
      <CommentList :comments="comment.comments" :deep="deep+1"/>
    </div>
  </div>
</template>