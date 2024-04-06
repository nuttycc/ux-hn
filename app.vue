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
      <nav class="pb-2 flex gap-4 justify-center overflow-x-auto">
        <NuxtLink to="/">Index</NuxtLink>

        <NuxtLink v-for="feed in validFeeds" :key="feed" :to="`/${feed}`" :class="{active: pathFeed == feed}">
          {{ feed }}
        </NuxtLink>

        <ToggleTheme />
      </nav>
    </header>
    <main class="w-[96vw] md:w-[60vw] border mx-auto mb-40">
      <NuxtPage />
    </main>
  </div>
</template>

<style>
:root {
  font-family: Inter, Robot;
}

main {
  min-height: 100vh;
}

.active {
  color: blue;
  text-decoration: underline;
}

.border {
  border-color:gray;
  border-radius: 2px;
}

.dark .border {
  border-color: #747474;
}

</style>
