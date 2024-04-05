<script setup lang="ts">
import type { Item } from '~/types/hn';


const props = defineProps<{
  items: Item[] | undefined
}>()

</script>

<template>
  <div>
    <p v-if="!items">Faild!</p>
    <ul v-else class="flex flex-col gap-2">
      <li v-for="item in props.items " :key="item.id" class="border">
        <ItemCard :item="item" />
      </li>
    </ul>
  </div>

</template>