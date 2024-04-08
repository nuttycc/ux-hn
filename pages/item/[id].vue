<script setup lang="ts">
const route = useRoute()
const id = computed(() => +route.params.id || 1)

const show = ref(false)

const { data: comments, loading } = toRefs(await fetchComments(id.value))
const { data: item } = toRefs(await fetchItem(id.value))

const toSummary = computed(() => {
  //{"":""}
  const newObj = comments.value?.map((item) => {
    return {
      username: item.by,
      comment: item.text
    }
  })

  return newObj || []
})

console.log('tosummary-', toSummary.value)
</script>

<template>
  <div class="dark:bg-slate-800">
    <p v-if="loading">loading...</p>
    <p v-else-if="!loading && !comments">Failed!</p>
    <div class="m-1">
      <div v-if="!item">item is undefined</div>
      <ItemCard v-else :item="item" index="✨" />
    </div>
    <button @click="() => (show = !show)">{{ show ? 'close' : 'open' }}</button>

    <Suspense v-if="show">
      <SummaryCard :text="`${toSummary?.slice(0, 20).toString()}`" :id="id" />
      <template #fallback>loading</template>
    </Suspense>
    <div class="m-2 mt-8 border-y">
      <CommentList :comments="comments" :deep="0" />
    </div>
  </div>
</template>
