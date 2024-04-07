<script setup lang="ts">

const props = defineProps<{
  text: string
  id:number
}>() 


const chatCompletion = await getGroqChatCompletion(props.text, props.id)

const raw = chatCompletion.choices[0].message?.content
console.log('chatCompletion', raw)


const parsed = JSON.parse(raw)


</script>

<template>
  <div class="flex flex-col gap-4">
    <div>
      <h2>Summary</h2>
      <p>{{ parsed.summary }}</p>
    </div>
    <div>
      <h2>Comments</h2>
      <ul class="flex flex-col gap-2">
        <li v-for="(item, index) in parsed.comments" :key="index">
          <span class="underline mr-2">@{{ item.username}}:</span>
          <span>{{ item.comment }}</span>
        </li>
      </ul>
    </div>
    <ul></ul>
  </div>
</template>

<style scoped>

li {
  list-style-type: none;
}

</style>