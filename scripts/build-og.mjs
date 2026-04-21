import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import sharp from 'sharp'

const here = path.dirname(fileURLToPath(import.meta.url))
const outPath = path.resolve(here, '../public/og-image.png')

const W = 1200
const H = 630

const fontStack =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif"
const monoStack = "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace"

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="bgGrad" cx="20%" cy="0%" r="120%">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="60%" stop-color="#020617"/>
      <stop offset="100%" stop-color="#000000"/>
    </radialGradient>

    <radialGradient id="orbBlue" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2563EB" stop-opacity="0.55"/>
      <stop offset="60%" stop-color="#2563EB" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#2563EB" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="orbCyan" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#60A5FA" stop-opacity="0.45"/>
      <stop offset="60%" stop-color="#60A5FA" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#60A5FA" stop-opacity="0"/>
    </radialGradient>

    <linearGradient id="nameGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#CBD5E1"/>
    </linearGradient>

    <linearGradient id="accentLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#60A5FA" stop-opacity="0.0"/>
      <stop offset="20%" stop-color="#60A5FA" stop-opacity="0.9"/>
      <stop offset="80%" stop-color="#2563EB" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#2563EB" stop-opacity="0.0"/>
    </linearGradient>

    <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="1.2" cy="1.2" r="1.2" fill="#1E293B" opacity="0.55"/>
    </pattern>
  </defs>

  <!-- Base background -->
  <rect width="${W}" height="${H}" fill="url(#bgGrad)"/>

  <!-- Dot grid -->
  <rect width="${W}" height="${H}" fill="url(#dots)"/>

  <!-- Accent orbs -->
  <circle cx="980" cy="520" r="380" fill="url(#orbBlue)"/>
  <circle cx="120" cy="80"  r="260" fill="url(#orbCyan)"/>

  <!-- Top-left monogram badge -->
  <g transform="translate(72, 72)">
    <rect x="0" y="0" rx="14" ry="14" width="60" height="60"
          fill="none" stroke="#334155" stroke-width="1.5"/>
    <text x="30" y="40" text-anchor="middle"
          font-family="${fontStack}" font-weight="800" font-size="24" fill="#F8FAFC">
      SN
    </text>
  </g>

  <!-- Top-left eyebrow -->
  <text x="156" y="110"
        font-family="${monoStack}" font-size="16" fill="#94A3B8"
        letter-spacing="3">
    PORTFOLIO  ·  CHICAGO, USA
  </text>

  <!-- Accent divider -->
  <rect x="72" y="170" width="220" height="2" fill="url(#accentLine)"/>

  <!-- Name -->
  <text x="72" y="280"
        font-family="${fontStack}" font-weight="900" font-size="104"
        fill="url(#nameGrad)" letter-spacing="-3">
    Shams Nahid K
  </text>

  <!-- Role -->
  <text x="72" y="350"
        font-family="${fontStack}" font-weight="700" font-size="44"
        fill="#60A5FA" letter-spacing="-1">
    Software Developer
  </text>

  <!-- Tagline -->
  <text x="72" y="408"
        font-family="${fontStack}" font-weight="500" font-size="26"
        fill="#CBD5E1" letter-spacing="-0.2">
    Resilient backend services  ·  Distributed systems  ·  Full-stack products
  </text>

  <!-- Bottom skill chips row -->
  <g font-family="${monoStack}" font-size="18" fill="#94A3B8">
    ${chipsRow(
      ['Python', 'Java', 'React', 'gRPC', 'FastAPI', 'Docker', 'TypeScript'],
      72,
      512
    )}
  </g>

  <!-- Bottom-left URL -->
  <text x="72" y="572"
        font-family="${monoStack}" font-size="18" fill="#64748B" letter-spacing="1">
    shamsnahidk.github.io
  </text>

  <!-- Bottom-right corner mark -->
  <g transform="translate(${W - 72}, 572)" text-anchor="end">
    <text font-family="${monoStack}" font-size="18" fill="#475569" letter-spacing="2">
      2026  ·  CHI
    </text>
  </g>
</svg>
`.trim()

function chipsRow(labels, x, y) {
  const chipPaddingX = 18
  const chipHeight = 36
  const chipGap = 12
  const charWidth = 10.2
  let cursor = x
  let out = ''
  for (const label of labels) {
    const width = Math.round(label.length * charWidth + chipPaddingX * 2)
    out += `
      <g transform="translate(${cursor}, ${y - chipHeight + 8})">
        <rect width="${width}" height="${chipHeight}" rx="${chipHeight / 2}" ry="${chipHeight / 2}"
              fill="#0F172A" stroke="#1E293B" stroke-width="1"/>
        <text x="${width / 2}" y="${chipHeight / 2 + 6}" text-anchor="middle"
              font-family="${monoStack}" font-size="15" fill="#CBD5E1">${label}</text>
      </g>`
    cursor += width + chipGap
  }
  return out
}

await writeFile(path.resolve(here, '../public/og-image.svg'), svg)

const png = await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toBuffer()

await writeFile(outPath, png)
console.log(`Wrote ${outPath} (${png.byteLength} bytes)`)
