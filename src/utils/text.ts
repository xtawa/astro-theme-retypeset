// Count words in a string, supporting CJK characters
export function countWords(str: string): number {
  if (!str) return 0
  
  const cleanStr = getPlainContent(str)
  
  // CJK characters count
  const cjk = (cleanStr.match(/[\u4e00-\u9fa5]/g) || []).length
  
  // Non-CJK words count (split by whitespace)
  const nonCjk = (cleanStr.replace(/[\u4e00-\u9fa5]/g, ' ').match(/\w+/g) || []).length
  
  return cjk + nonCjk
}

export function getPlainContent(str: string): string {
  if (!str) return ''
  
  return str
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // images
    .replace(/#{1,6}\s+/g, '') // headers
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // bold
    .replace(/(\*|_)(.*?)\1/g, '$2') // italic
    .replace(/`{3}[\s\S]*?`{3}/g, '') // code blocks
    .replace(/`(.+?)`/g, '$1') // inline code
    .replace(/\n/g, ' ') // newlines to spaces
    .replace(/\s+/g, ' ') // collapse spaces
    .trim()
}

export function getRandomSentence(posts: any[]): { text: string, title: string, link: string } {
  const defaultQuote = {
    text: "当第一颗卫星飞向大气层外，我们便以为自己终有一日会征服宇宙。",
    title: "社区",
    link: "/"
  }

  if (!posts || posts.length === 0) return defaultQuote

  // 1. Filter posts with specific tag
  const targetTag = "好词好句"
  const targetPosts = posts.filter(post => post.data.tags && post.data.tags.includes(targetTag))

  // If no posts with tag found, use default
  if (targetPosts.length === 0) {
    return defaultQuote
  }

  // 2. Pick random post from filtered list
  const randomPost = targetPosts[Math.floor(Math.random() * targetPosts.length)]
  const content = getPlainContent(randomPost.body)

  // 3. Split into sentences (supports English and CJK punctuation)
  const sentences = content
    .split(/([.!?。！？])/)
    .reduce((acc: string[], part, i, arr) => {
      if (i % 2 === 0) {
        const punctuation = arr[i + 1] || ''
        const sentence = (part + punctuation).trim()
        if (sentence.length > 5 && sentence.length < 100) {
          acc.push(sentence)
        }
      }
      return acc
    }, [])

  if (sentences.length === 0) {
    return defaultQuote
  }

  // 4. Pick random sentence
  const randomSentence = sentences[Math.floor(Math.random() * sentences.length)]
  
  return {
    text: randomSentence,
    title: randomPost.data.title,
    link: randomPost.data.abbrlink || randomPost.id
  }
}
