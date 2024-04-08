<script setup lang="ts">
import type { Item } from '~/types/hn'

const props = defineProps<{
  items: Item[] | undefined
  page: number
}>()

const index = computed(() => (props.page - 1) * 10)
</script>

<template>
  <div>
    <p v-if="!items">Faild!</p>
    <ul v-else class="flex flex-col gap-1">
      <li v-for="(item, i) in props.items" :key="item.id">
        <ItemCard :item="item" :index="index + i + 1" />
      </li>
    </ul>
  </div>
</template>
