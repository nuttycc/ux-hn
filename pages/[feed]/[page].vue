<script setup lang="ts">
definePageMeta({
  middleware: 'feed'
})

const route = useRoute()
const page = computed(() => +route.params.page || 1)
const feed = computed(() => (route.params.feed as string) || 'top')

const curPage = ref(page.value)

useHead({
  title: feed
})

const items = await fetchFeed(feed.value, page.value)

const { data, loading } = toRefs(items)
</script>

<template>
  <div class="m-1">
    <p v-if="loading">loading...</p>
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
