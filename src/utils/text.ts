// Count words in a string, supporting CJK characters
export function countWords(str: string): number {
  if (!str) return 0
  
  // Remove Markdown syntax roughly to get better estimate (optional but recommended)
  // Simple strip: remove link urls, image urls, special chars
  const cleanStr = str
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // images
    .replace(/#{1,6}\s+/g, '') // headers
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // bold
    .replace(/(\*|_)(.*?)\1/g, '$2') // italic
    .replace(/`{3}[\s\S]*?`{3}/g, '') // code blocks
    .replace(/`(.+?)`/g, '$1') // inline code
  
  // CJK characters count
  const cjk = (cleanStr.match(/[\u4e00-\u9fa5]/g) || []).length
  
  // Non-CJK words count (split by whitespace)
  const nonCjk = (cleanStr.replace(/[\u4e00-\u9fa5]/g, ' ').match(/\w+/g) || []).length
  
  return cjk + nonCjk
}
