<script setup lang="ts">
const props = defineProps<{
  text: string
  id: number
}>()

const errorMsg = ref('')
const parsed = ref()
const chatCompletion = await getGroqChatCompletion(props.text, props.id)

if (typeof chatCompletion === 'string') {
  errorMsg.value = chatCompletion
} else {
  const raw = chatCompletion.choices[0].message?.content
  console.log('chatCompletion', raw)
  parsed.value = JSON.parse(raw)
}
</script>

<template>
  <div v-if="errorMsg">{{ errorMsg }}</div>
  <div v-else class="flex flex-col gap-4">
    <div>
      <h2>Summary</h2>
      <p>{{ parsed.summary }}</p>
    </div>
  </div>
</template>

<style scoped>
li {
  list-style-type: none;
}
</style>
