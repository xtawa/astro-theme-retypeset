import fs from 'node:fs/promises'
import path from 'node:path'
import { parse } from 'node-html-parser'
import { HttpsProxyAgent } from 'https-proxy-agent'
import fetch from 'node-fetch'

// Configuration
const CHANNEL_USERNAME = process.env.CASUAL_TELEGRAM_CHANNEL || 'hi_co1sini_casual'
const PROXY_URL = process.env.HTTPS_PROXY || process.env.https_proxy || 'http://127.0.0.1:7890' // e.g. 'http://127.0.0.1:7890'
const OUTPUT_FILE = path.join(process.cwd(), 'src/data/casual.json')

interface CasualPost {
  id: string
  content: string
  date: string
  timestamp: number
  images: string[]
  link: string
}

async function fetchTelegramPosts() {
  console.log(`Fetching posts from Telegram channel: @${CHANNEL_USERNAME}...`)
  if (PROXY_URL) {
    console.log(`Using proxy: ${PROXY_URL}`)
  }

  try {
    const options: any = {}
    if (PROXY_URL) {
      options.agent = new HttpsProxyAgent(PROXY_URL)
    }

    const response = await fetch(`https://t.me/s/${CHANNEL_USERNAME}`, options)
    if (!response.ok) {
      throw new Error(`Failed to fetch channel: ${response.statusText}`)
    }

    const html = await response.text()
    const root = parse(html)
    const messages = root.querySelectorAll('.tgme_widget_message_wrap')

    const posts: CasualPost[] = []

    for (const msg of messages) {
      const textElement = msg.querySelector('.tgme_widget_message_text')
      const timeElement = msg.querySelector('.tgme_widget_message_date time')
      const linkElement = msg.querySelector('.tgme_widget_message_date')
      const imageElements = msg.querySelectorAll('.tgme_widget_message_photo_wrap')

      if (!textElement && imageElements.length === 0) continue

      const content = textElement ? textElement.innerHTML : ''
      const date = timeElement ? timeElement.getAttribute('datetime') || '' : ''
      const link = linkElement ? linkElement.getAttribute('href') || '' : ''
      const timestamp = date ? new Date(date).getTime() : 0
      
      // Extract images (background-image style)
      const images = imageElements.map(img => {
        const style = img.getAttribute('style') || ''
        const match = style.match(/url\('([^']+)'\)/)
        return match ? match[1] : ''
      }).filter(Boolean)

      // Extract ID from link (e.g., https://t.me/channel/123 -> 123)
      const id = link.split('/').pop() || String(timestamp)

      posts.push({
        id,
        content,
        date,
        timestamp,
        images,
        link
      })
    }

    // Sort by date descending
    posts.sort((a, b) => b.timestamp - a.timestamp)

    // Ensure directory exists
    await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true })

    // Write to file
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(posts, null, 2))
    
    console.log(`Successfully fetched ${posts.length} posts. Saved to ${OUTPUT_FILE}`)

  } catch (error) {
    console.error('Error fetching Telegram posts:', error)
    process.exit(1)
  }
}

fetchTelegramPosts()
