import OpenAI from 'openai'
import { openaiBase } from './openai'

export function cerebras(env: Record<string, string>) {
  const map = {
    'cerebras/qwen-3-235b-a22b-instruct-2507': 'qwen-3-235b-a22b-instruct-2507',
    'cerebras/qwen-3-235b-a22b-thinking-2507': 'qwen-3-235b-a22b-thinking-2507',
    'cerebras/qwen-3-coder-480b': 'qwen-3-coder-480b',
    'cerebras/llama-3.3-70b': 'llama-3.3-70b',
    'cerebras/gpt-oss-120b': 'gpt-oss-120b',
    'cerebras/qwen-3-32b': 'qwen-3-32b',
    'cerebras/llama3.1-8b': 'llama3.1-8b',
    'cerebras/llama-4-scout-17b-16e-instruct': 'llama-4-scout-17b-16e-instruct',
    'cerebras/deepseek-r1-distill-llama-70b': 'deepseek-r1-distill-llama-70b',
    'cerebras/llama-4-maverick-17b-128e-instruct': 'llama-4-maverick-17b-128e-instruct',
  }
  const r = openaiBase({
    createClient: () =>
      new OpenAI({
        apiKey: env.CEREBRAS_API_KEY,
        baseURL: 'https://api.cerebras.ai/v1',
      }),
    pre(req) {
      req.model = map[req.model as keyof typeof map]
      return req
    },
  })
  r.name = 'cerebras'
  r.requiredEnv = ['CEREBRAS_API_KEY']
  r.supportModels = Object.keys(map)
  return r
}
