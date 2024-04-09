import Groq from 'groq-sdk'
import type { ChatCompletion } from 'groq-sdk/resources/chat/completions.mjs'

export async function getGroqChatCompletion(text: string, id: number) {
  const store = useState<Record<number, ChatCompletion>>('Groqchat')

  const get = () => {
    return store.value?.[id]
  }

  const set = (data: any) => {
    if (!store.value) {
      store.value = {}
    }
    store.value[id] = data
  }

  if (get()) {
    return get()
  }

  let apiKey = ''

  // 如果是 浏览器端，就从 localStorage 中获取 apiKey , 存储格式为："keys":{"groqKey":""}
  if (typeof window !== 'undefined') {
    const keys = JSON.parse(localStorage.getItem('keys') || '{}')
    apiKey = keys?.groqKey || ''
    console.log('🔵 apikey-', apiKey)
  }
  try {
    const groq = new Groq({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    })

    console.log('🔷 text--', text)
    const data = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'responde in JSON format and Chinese Language!'
        },
        {
          role: 'user',
          content: `summarize {input} in Chinese, outputting in JSON format.
              exapmle output:{
                "summary": your chinese summary,
              }
              --input: ${text}
            `
        }
      ],
      model: 'mixtral-8x7b-32768',
      stream: false,
      response_format: {
        type: 'json_object'
      }
    })

    set(data)

    return data
  } catch (e: any) {
    console.log('🔴 error-', e.message)
    return e.message
  }
}
