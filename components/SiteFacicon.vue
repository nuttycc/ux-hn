<script setup lang="ts">
// 加载 favicon，如果出错则尝试下一个来源，全部错误则使用默认图标
const props = defineProps < {
  domain: string
}>()

type FaviconSource = 'duckduckgo' | 'google' | 'faviconfinder' | 'error'

const faviconSource = ref < FaviconSource > ('duckduckgo')
const faviconUrl = computed(() => faviconSources[faviconSource.value](props.domain))


const faviconSources: Record<FaviconSource, (domain: string) => string> = {
  faviconfinder: (domain) => `https://www.faviconfinder.com/icons/${domain}`,
  duckduckgo: (domain) => `https://icons.duckduckgo.com/ip3/${domain}.ico`,
  google: (domain) =>
    `https://www.google.com/s2/favicons?domain=${domain}&sz=16`,
  error: () => 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgNDggNDgiPjxnIGZpbGw9Im5vbmUiPjxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik00NCAyMy45OTQxQzQ0IDIyLjg4OTYgNDMuMTA0NiAyMS45OTQxIDQyIDIxLjk5NDFDNDAuODk1NCAyMS45OTQxIDQwIDIyLjg4OTYgNDAgMjMuOTk0MUg0NFpNMjQgNy45OTQxNEMyNS4xMDQ2IDcuOTk0MTQgMjYgNy4wOTg3MSAyNiA1Ljk5NDE0QzI2IDQuODg5NTcgMjUuMTA0NiAzLjk5NDE0IDI0IDMuOTk0MTRWNy45OTQxNFpNMzkgMzkuOTk0MUg5VjQzLjk5NDFIMzlWMzkuOTk0MVpNOCAzOC45OTQxVjguOTk0MTRINFYzOC45OTQxSDhaTTQwIDIzLjk5NDFWMzguOTk0MUg0NFYyMy45OTQxSDQwWk05IDcuOTk0MTRIMjRWMy45OTQxNEg5VjcuOTk0MTRaTTkgMzkuOTk0MUM4LjQ0NzcyIDM5Ljk5NDEgOCAzOS41NDY0IDggMzguOTk0MUg0QzQgNDEuNzU1NiA2LjIzODU3IDQzLjk5NDEgOSA0My45OTQxVjM5Ljk5NDFaTTM5IDQzLjk5NDFDNDEuNzYxNCA0My45OTQxIDQ0IDQxLjc1NTYgNDQgMzguOTk0MUg0MEM0MCAzOS41NDY0IDM5LjU1MjMgMzkuOTk0MSAzOSAzOS45OTQxVjQzLjk5NDFaTTggOC45OTQxNEM4IDguNDQxODYgOC40NDc3MSA3Ljk5NDE0IDkgNy45OTQxNFYzLjk5NDE0QzYuMjM4NTggMy45OTQxNCA0IDYuMjMyNzIgNCA4Ljk5NDE0SDhaIi8+PHBhdGggc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iNCIgZD0iTTYgMzVMMTYuNjkzMSAyNS4xOThDMTcuNDM4OSAyNC41MTQzIDE4LjU3NzkgMjQuNDk1MyAxOS4zNDYxIDI1LjE1MzhMMzIgMzYiLz48cGF0aCBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSI0IiBkPSJNMjggMzFMMzIuNzczNSAyNi4yMjY1QzMzLjQ3NzIgMjUuNTIyOCAzNC41OTE0IDI1LjQ0MzYgMzUuMzg3NyAyNi4wNDA4TDQyIDMxIi8+PHBhdGggc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iNCIgZD0iTTMzIDdMNDEgMTUiLz48cGF0aCBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSI0IiBkPSJNNDEgN0wzMyAxNSIvPjwvZz48L3N2Zz4='
}

const nextUrl = () => {
  const sources = Object.keys(faviconSources) as FaviconSource[]
  const currentIndex = sources.indexOf(faviconSource.value)
  const nextIndex = currentIndex + 1
  faviconSource.value = sources[nextIndex]
}

</script>

<template>
  <span class="inline-block ">
    <img alt="favicon" loading="lazy" :src="faviconUrl" @error="nextUrl" style="width:0.9rem; height:0.9rem;" />
  </span>
</template>

<style scoped>
  span {
    vertical-align: middle;
  }

</style>