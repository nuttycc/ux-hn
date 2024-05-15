<!-- eslint-disable @typescript-eslint/no-unused-vars -->
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
  console.log('tosummary-', JSON.stringify(newObj))

  return newObj || []
})

const addHashOnBack = () => {
  window.onpopstate = (event) => {
    if (event.state) {
      const curUrl = new URL(window.location.href)
      if(!curUrl.hash) {
        curUrl.hash = `#${id.value}`
        history.replaceState(history.state, '', curUrl.toString())
      }
      
    }
  }
}



onMounted(() => {
  addHashOnBack()
})

</script>

<template>
  <div class="dark:bg-slate-800">
    <!-- <p v-if="loading">loading...</p> -->
    <!-- <p v-else-if="!loading && !comments">Failed!</p> -->
    <div class="m-1">
      <div v-if="!item">item is undefined</div>
      <ItemCard v-else :item="item" index="✨" />
    </div>
    <button @click="() => (show = !show)">{{ show ? '🤖close' : '🤖open' }}</button>

    <Suspense v-if="show">
      <SummaryCard :id="id" :text="`${JSON.stringify(toSummary?.slice(0, 20))}`" class="text-sm leading-6 indent-2" />
      <template #fallback>loading</template>
    </Suspense>
    <div class="m-2 mt-8 border-y">
      <CommentList :comments="comments" :deep="0" />
    </div>
  </div>
</template>

<style scoped>


</style>
