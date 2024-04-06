<script setup lang="ts">

useHead({
  titleTemplate: (title) => title ? `${title} - HN` : 'HN',
})

const route = useRoute()
const pathFeed = computed(() => route.params.feed as string)
console.log('feed', pathFeed.value)
</script>
<template>
  <div>
    <NuxtLoadingIndicator />
    <header class="border-b mb-3 mt-4">
      <nav class="flex gap-4">
        <NuxtLink to="/">Index</NuxtLink>

        <NuxtLink v-for="feed in validFeeds" :key="feed" :to="`/${feed}`" :class="{active: pathFeed == feed}">
          {{ feed }}
        </NuxtLink>
      </nav>
    </header>
    <main class="md:w-[60vw] border mx-auto mb-40">
      <NuxtPage />
    </main>
  </div>
</template>

<style>
:root {
  font-family: Inter;
}

main {
  min-height: 100vh;
}

.active {
  color: blue;
  text-decoration: underline;
}


</style>
