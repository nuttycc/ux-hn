<script setup lang="ts">

const route = useRoute()
const id = computed(() => +route.params.id || 1)

const {data, loading} = toRefs(await fetchComments(id.value))
const { data: item } = toRefs(await fetchItem(id.value))

console.log('🎉comments: ',data.value)
</script>

<template>
  <div class="dark:bg-slate-800">
    <div class="m-1">
      <div v-if="!item">item is undefined</div>
      <ItemCard v-else :item="item" index="✨" />
    </div>
    <p v-if="loading">loading...</p>
    <p v-else-if="!loading && !data">Failed!</p>
    <div class="m-2 mt-8 border-y">
      <CommentList :comments="data" :deep="0"/>
    </div>
  </div>
</template>