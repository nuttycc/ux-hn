<script setup lang="ts">
import { useStorage } from '@vueuse/core'

const theDefault = {
  groqKey: ''
}

const store = useStorage('keys', theDefault)
</script>

<template>
  <div>
    <label for="groqKey">Groq Key</label>
    <input v-model="store.groqKey" name="groqKey" type="text" >
  </div>
</template>

<style scoped>
input {
  border: 1px solid #ccc;
  padding: 0.5rem;
  margin: 0.5rem 0;
  width: 100%;
}
</style>
