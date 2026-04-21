import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { createServer } from 'vite'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const distHtml = path.join(root, 'dist', 'index.html')

const ROOT_PLACEHOLDER = '<div id="root"></div>'

async function main() {
  const template = await readFile(distHtml, 'utf-8')
  if (!template.includes(ROOT_PLACEHOLDER)) {
    throw new Error(
      `prerender: expected ${ROOT_PLACEHOLDER} in dist/index.html — has it already been prerendered?`,
    )
  }

  const vite = await createServer({
    root,
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'warn',
  })

  try {
    const mod = await vite.ssrLoadModule('/src/entry-server.tsx')
    if (typeof mod.render !== 'function') {
      throw new Error('prerender: src/entry-server.tsx must export a render() function')
    }
    const appHtml = mod.render()
    const final = template.replace(ROOT_PLACEHOLDER, `<div id="root">${appHtml}</div>`)
    await writeFile(distHtml, final)
    const sizeKb = (Buffer.byteLength(final, 'utf-8') / 1024).toFixed(2)
    const appKb = (Buffer.byteLength(appHtml, 'utf-8') / 1024).toFixed(2)
    console.log(`prerender: injected ${appKb} KB of SSR HTML — final dist/index.html is ${sizeKb} KB`)
  } finally {
    await vite.close()
  }
}

main().catch((err) => {
  console.error('prerender failed:', err)
  process.exit(1)
})
