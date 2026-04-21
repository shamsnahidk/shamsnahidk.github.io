import { writeFile, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import sharp from 'sharp'

const here = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(here, '../public')

const sourceSvg = await readFile(path.join(publicDir, 'favicon.svg'))

const targets = [
  { name: 'favicon-32.png', size: 32 },
  { name: 'apple-touch-icon-180.png', size: 180, padding: true },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'icon-maskable-512.png', size: 512, maskable: true },
]

for (const t of targets) {
  const dest = path.join(publicDir, t.name)
  let pipeline = sharp(sourceSvg, { density: 384 })

  if (t.maskable) {
    const inner = Math.round(t.size * 0.8)
    const offset = Math.round((t.size - inner) / 2)
    const innerPng = await sharp(sourceSvg, { density: 384 })
      .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer()
    pipeline = sharp({
      create: {
        width: t.size,
        height: t.size,
        channels: 4,
        background: { r: 15, g: 23, b: 42, alpha: 1 },
      },
    })
      .composite([{ input: innerPng, top: offset, left: offset }])
      .png({ compressionLevel: 9 })
  } else if (t.padding) {
    const inner = Math.round(t.size * 0.86)
    const offset = Math.round((t.size - inner) / 2)
    const innerPng = await sharp(sourceSvg, { density: 384 })
      .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer()
    pipeline = sharp({
      create: {
        width: t.size,
        height: t.size,
        channels: 4,
        background: { r: 15, g: 23, b: 42, alpha: 1 },
      },
    })
      .composite([{ input: innerPng, top: offset, left: offset }])
      .png({ compressionLevel: 9 })
  } else {
    pipeline = pipeline
      .resize(t.size, t.size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
  }

  const out = await pipeline.toBuffer()
  await writeFile(dest, out)
  console.log(`Wrote ${t.name} (${out.byteLength} bytes)`)
}
