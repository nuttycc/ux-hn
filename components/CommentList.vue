<script setup lang="ts">
import type { Item } from '~/types/hn';

const props = defineProps<{
  comments: Item[] | undefined
  deep: number
}>()

</script>

<template>
  <div>
    <div v-if="!comments">loading...</div>
    <ul v-else class="flex flex-col gap-2">
      <li v-for="comment in props.comments" :key="comment.id" class="">
        <CommentCard :comment="comment" :deep="deep"/>
      </li>
    </ul>
  </div>
</template>