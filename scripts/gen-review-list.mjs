// Generates public/review-list.json from files in public/pic review/
import { readdirSync, writeFileSync } from 'fs'
import { join } from 'path'

const dir = join(process.cwd(), 'public', 'pic review')
try {
  const files = readdirSync(dir)
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort()
    .map(f => `/pic%20review/${encodeURIComponent(f)}`)
  writeFileSync(join(process.cwd(), 'public', 'review-list.json'), JSON.stringify(files))
  console.log(`✅ Generated review-list.json with ${files.length} images`)
} catch (e) {
  console.error('Failed to generate review list:', e)
  writeFileSync(join(process.cwd(), 'public', 'review-list.json'), '[]')
}
