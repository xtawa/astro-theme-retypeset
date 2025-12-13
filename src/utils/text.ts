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
  if (!posts || posts.length === 0) return { text: '', title: '', link: '' }

  // 1. Pick random post
  const randomPost = posts[Math.floor(Math.random() * posts.length)]
  const content = getPlainContent(randomPost.body)

  // 2. Split into sentences (supports English and CJK punctuation)
  // Split by: . ! ? 。 ！ ？ and filter empty
  const sentences = content
    .split(/([.!?。！？])/)
    .reduce((acc: string[], part, i, arr) => {
      if (i % 2 === 0) {
        // This is the sentence part
        const punctuation = arr[i + 1] || ''
        const sentence = (part + punctuation).trim()
        if (sentence.length > 5 && sentence.length < 100) { // Filter too short or too long
          acc.push(sentence)
        }
      }
      return acc
    }, [])

  if (sentences.length === 0) {
    // If no valid sentences found in this post, try again (recursive) or fallback
    // For safety, just return title if parsing fails
    return { text: randomPost.data.title, title: randomPost.data.title, link: randomPost.id }
  }

  // 3. Pick random sentence
  const randomSentence = sentences[Math.floor(Math.random() * sentences.length)]
  
  return {
    text: randomSentence,
    title: randomPost.data.title,
    link: randomPost.data.abbrlink || randomPost.id
  }
}
