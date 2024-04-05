<script setup lang="ts">
</script>
<template>
  <div>
    <NuxtLoadingIndicator />
    <header>
      <h1>oooooo</h1>
      <nav class="flex gap-4">
        <NuxtLink to="/">Index</NuxtLink>
        <NuxtLink to="/top">Top</NuxtLink>
        <NuxtLink to="/new">new</NuxtLink>
      </nav>
    </header>
    <main class="md:w-[60vw] border mx-auto mb-40">
      <NuxtPage />
    </main>
  </div>
</template>

<style>

main {
  min-height: 100vh;
}

</style>
