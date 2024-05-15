<script setup lang="ts">
definePageMeta({
  middleware: 'feed'
})

const route = useRoute()
const page = computed(() => +route.params.page || 1)
const feed = computed(() => (route.params.feed as string) || 'top')

const curPage = ref(page.value)

watch(curPage, async () => {
  fetchFeed(feed.value, curPage.value + 1)
})

onMounted(() => {
  fetchFeed(feed.value, curPage.value + 1)
})

useHead({
  title: feed
})


onMounted(() => {
  const hash = window.location.hash.slice(1)
  const el = document.getElementById(hash)
  if (el) {
    el.scrollIntoView()
    el.classList.add('blinking-border')
    // setTimeout(() => {
    //   el.classList.remove('blinking-border')
    // }, 3000)
  }
})


const items = await fetchFeed(feed.value, page.value)

const { data, loading } = toRefs(items)
</script>

<template>
  <div class="m-1 min-h-[600px]" >
    <div v-if="loading">loading...</div>
    <div v-else-if="!loading && !data">Failed!</div>
    <ItemList v-else :items="data" :page="page" />
    <UPagination
      v-if="!loading"
      v-model="curPage"
      :page-count="5"
      :total="50"
      @click="navigateTo(`/${feed}/${curPage}`)"
    />
  </div>
</template>

<style>
.blinking-border {
  border: 1px solid;
  border-image: linear-gradient(45deg, #c471ed, #12c2e9) 1; /* 紫蓝色渐变 */
  animation: blink-border 2s infinite ease-in-out; /* 延长动画时间，使用平滑的动画曲线 */
}

/* @keyframes blink-border {
  0%, 100% {
    border-image: linear-gradient(45deg, #c471ed, #12c2e9) 1;
  }
  50% {
    border-image: linear-gradient(45deg, transparent, transparent) 1;
  }
} */

</style>