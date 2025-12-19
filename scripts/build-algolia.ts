/**
 * Algolia Index Builder Script
 * 
 * This script reads all blog posts and pushes them to Algolia for search indexing.
 * It runs automatically during the build process on Vercel.
 * 
 * Environment Variables (set in Vercel Dashboard):
 *   - ALGOLIA_ADMIN_KEY: Your Algolia Admin API Key (required for indexing)
 * 
 * Local Usage:
 *   1. Set environment variable: $env:ALGOLIA_ADMIN_KEY="your-admin-api-key"
 *   2. Run: pnpm build-algolia
 * 
 * Note: The Admin API Key is different from the Search API Key.
 *       Never expose the Admin API Key in client-side code!
 */

import { algoliasearch } from 'algoliasearch'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

// Configuration - Update these values from your src/config.ts
const ALGOLIA_APP_ID = 'XG9J7TBGD8'
const ALGOLIA_INDEX_NAME = 'blog_xtyin_pages'
const SITE_URL = 'https://blog.xtyin.com'

// Get the Admin API Key from environment variable
const ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY

if (!ALGOLIA_ADMIN_KEY) {
  console.log('⚠️  ALGOLIA_ADMIN_KEY not set. Skipping Algolia index build.')
  console.log('   To enable search indexing, set ALGOLIA_ADMIN_KEY in Vercel Dashboard.')
  console.log('   Dashboard: https://vercel.com/[your-team]/[your-project]/settings/environment-variables')
  console.log('')
  process.exit(0) // Exit gracefully without error
}

console.log('🔍 Starting Algolia index build...')
console.log(`   App ID: ${ALGOLIA_APP_ID}`)
console.log(`   Index: ${ALGOLIA_INDEX_NAME}`)
console.log('')

// Initialize Algolia client
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY)

interface PostRecord {
  objectID: string
  title: string
  description: string
  content: string
  url: string
  lang: string
  tags: string[]
  published: string
  type: 'lvl0' | 'lvl1' | 'lvl2' | 'content'
  hierarchy: {
    lvl0: string
    lvl1: string | null
    lvl2: string | null
  }
}

function getPlainContent(str: string): string {
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

async function buildIndex() {
  const postsDir = path.join(process.cwd(), 'src', 'content', 'posts')
  const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
  
  const records: PostRecord[] = []
  
  for (const file of files) {
    const filePath = path.join(postsDir, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    
    try {
      const { data: frontmatter, content } = matter(fileContent)
      
      // Skip drafts
      if (frontmatter.draft) {
        console.log(`⏭️  Skipping draft: ${file}`)
        continue
      }
      
      const lang = frontmatter.lang || 'zh'
      const slug = frontmatter.abbrlink || file.replace(/\.mdx?$/, '').replace(/-[a-z]{2}$/, '')
      
      // Build URL based on language
      const url = lang === 'zh' 
        ? `${SITE_URL}/posts/${slug}/`
        : `${SITE_URL}/${lang}/posts/${slug}/`
      
      // Create main record for the post
      const plainContent = getPlainContent(content)
      
      records.push({
        objectID: `${slug}-${lang}`,
        title: frontmatter.title || 'Untitled',
        description: frontmatter.description || plainContent.slice(0, 200),
        content: plainContent.slice(0, 5000), // Limit content size
        url: url,
        lang: lang,
        tags: frontmatter.tags || [],
        published: frontmatter.published ? new Date(frontmatter.published).toISOString() : new Date().toISOString(),
        type: 'lvl1',
        hierarchy: {
          lvl0: lang === 'zh' ? '文章' : 'Posts',
          lvl1: frontmatter.title || 'Untitled',
          lvl2: null
        }
      })
      
      console.log(`✅ Processed: ${frontmatter.title || file}`)
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error)
    }
  }
  
  if (records.length === 0) {
    console.log('⚠️  No records to index.')
    return
  }
  
  console.log('')
  console.log(`📝 Total records to index: ${records.length}`)
  console.log('')
  
  try {
    // Clear existing records and add new ones
    console.log('🔄 Updating Algolia index...')
    
    // Save objects to Algolia
    const response = await client.saveObjects({
      indexName: ALGOLIA_INDEX_NAME,
      objects: records as unknown as Record<string, unknown>[]
    })
    
    console.log(`✅ Successfully indexed ${records.length} records!`)
    console.log(`📊 Response:`, response)
    
    // Configure index settings for DocSearch compatibility
    console.log('')
    console.log('⚙️  Configuring index settings...')
    
    await client.setSettings({
      indexName: ALGOLIA_INDEX_NAME,
      indexSettings: {
        searchableAttributes: [
          'hierarchy.lvl0',
          'hierarchy.lvl1',
          'hierarchy.lvl2',
          'title',
          'description',
          'content',
          'tags'
        ],
        attributesForFaceting: [
          'lang',
          'type',
          'tags'
        ],
        customRanking: [
          'desc(published)'
        ],
        attributesToSnippet: [
          'content:50',
          'description:50'
        ],
        highlightPreTag: '<mark>',
        highlightPostTag: '</mark>'
      }
    })
    
    console.log('✅ Index settings configured!')
    console.log('')
    console.log('🎉 Done! Your search should now work.')
    console.log(`🔍 Test it at: ${SITE_URL}/search/`)
  } catch (error) {
    console.error('❌ Error updating Algolia index:', error)
    process.exit(1)
  }
}

buildIndex()
