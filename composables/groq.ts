import Groq from "groq-sdk";
import type { ChatCompletion } from "groq-sdk/resources/chat/completions.mjs";

export async function getGroqChatCompletion(text: string, id:number) {

  const store = useState<Record<number, ChatCompletion>>('Groqchat')

  const get = () => {
    return store.value?.[id] 
  }

  const set = (data:any) => {
    if (!store.value) {
      store.value = {};
    }
    store.value[id] = data
  }

  if (get()) {
    console.log('🟤 get!')

    return get()
  }

  let apiKey = ''

    // 如果是 浏览器端，就从 localStorage 中获取 apiKey , 存储格式为："keys":{"groqKey":""}
  if (typeof window !== 'undefined') {
    const keys = JSON.parse(localStorage.getItem('keys') || '{}')
    apiKey = keys?.groqKey || '' 
    console.log('🔵 apikey-', apiKey)
  }
    
  const groq = new Groq({
    apiKey: apiKey,
    dangerouslyAllowBrowser:true
  });

  console.log('🔵 apikey-', apiKey)


  const data = await groq.chat.completions.create({
    messages:
      [
        {
          role: "system",
          content: "responde in JSON format"
        },
        {
            role: "user",
          content: `summarize and pick comments with its username, outputting in JSON format.

         user input: [
    {
        "username": "jackhalford",
        "comment": " where forces are anyway replaced with hamiltonians."
    },
    {
        "username": "abnry",
        "comment": "I have no clue about this paper. Only comment is that this was published April 1st."
    },
]
            asistant response:{
              "summary": your summary,
              "comments": [
                {
                  "username": jackhalford,
                  "comment": "where forces are anyway replaced with hamiltonians.",
                },
                    {
        "username": "abnry",
        "comment": "I have no clue about this paper. Only comment is that this was published April 1st."
    },
              ]
            }
            --comments:${text}`
        }
      ],
    model: "mixtral-8x7b-32768",
     stream: false,
    response_format: {
      type: "json_object"
    }
  });

  set(data)

  return data
}

