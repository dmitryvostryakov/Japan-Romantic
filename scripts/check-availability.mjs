import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const filePath = resolve(__dirname, '..', 'public', 'availability.json')

const data = JSON.parse(readFileSync(filePath, 'utf-8'))
data.lastChecked = new Date().toISOString()

writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8')

console.log(`✓ availability.json updated — lastChecked: ${data.lastChecked}`)
