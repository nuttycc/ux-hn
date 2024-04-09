<script setup lang="ts">
useHead({
  titleTemplate: (title) => (title ? `${title} - HN` : 'HN')
})
const route = useRoute()
const pathFeed = computed(() => route.params.feed as string)

</script>
<template>
  <div>
    <NuxtLoadingIndicator />
    <header class="border-b mb-3 mt-4">
      <nav class="pb-2 flex gap-2 justify-center items-center overflow-x-auto">
        <NuxtLink v-for="feed in validFeeds" :key="feed" :to="`/${feed}`" :class="{ active: pathFeed == feed }">
          {{ feed }}
        </NuxtLink>

        <ToggleTheme />

        <NuxtLink to="/settings">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zm2.8-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.013 2.475T12.05 15.5" />
          </svg>
        </NuxtLink>
      </nav>
    </header>
    <main class="w-[96vw] md:w-[60vw] border mx-auto my-4">
      <NuxtPage />
    </main>
    <footer class="align-center text-center mb-4">
      Powered by Nuxt
    </footer>
  </div>
</template>

<style>
:root {
  font-family: Inter, Robot;
}
body {
  min-height: 100vh;
}

.active {
  color: #C9B86A;
  /* text-decoration: underline; */
  transition: color 0.2s ease;
}

.border {
  border-color: gray;
  border-radius: 2px;
}

.dark .border {
  border-color: #747474;
}
</style>
