import esbuild from 'esbuild'
import { sassPlugin } from 'esbuild-sass-plugin'
import { open } from 'node:fs/promises'
import { existsSync } from 'node:fs'

const outDir = 'public'
const entry_points = {
  search: './index.js',
  style: './src/index.css'
}

// Helper functions
async function readFile(file) {
  let filehandle
  let html = ''
  try {
    filehandle = await open(file, 'r+')
    filehandle.readFile('utf8').then(function(contents) {
      html += contents
    })
  } catch (error) {
    console.error('there was an error:', error.message)
  } finally {
    await filehandle?.close()
    return html
  }
}
async function writeFile(file, html) {
  let filehandle
  try {
    filehandle = await open(file, 'w')
    filehandle.writeFile(html, 'utf8')
  } catch (error) {
    console.error('there was an error:', error.message)
  } finally {
    await filehandle?.close()
  }
}

// Create config.js from local config.js or with token from github secret.
if (existsSync(`config.js`)) {
  const template = await readFile(`config.js`)
  writeFile(`${outDir}/config.js`, template)
} else {
  const template = await readFile(`config.example.js`)
  const content = template
    .replace('[ INSERT API_TOKEN ]', process.env.API_TOKEN)
    .replace('[ INSERT DF_TOKEN_U ]', process.env.DF_TOKEN_U)
    .replace('[ INSERT DF_TOKEN_P ]', process.env.DF_TOKEN_P)
  writeFile(`${outDir}/config.js`, content)
}

if (process.env.NODE_ENV === 'production') {

  // Production build
  esbuild.build({
    entryPoints: entry_points,
    outdir: outDir,
    bundle: true,
    minify: true,
    metafile: true,
    splitting: true,
    format: 'esm',
    loader: {
      '.ttf': 'file',
      '.svg': 'text'
    },
    plugins: [
      sassPlugin()
    ]
  })
  .then((result) => {
    
    esbuild.analyzeMetafile(result.metafile).then((analysis) => {
      console.log(analysis)
      console.log('Build finished 👍')
    })
    
  })
  .catch(() => process.exit(1))

} else {
  // Development mode watches for file changes and rebuilds
  esbuild.context({
    entryPoints: entry_points,
    outdir: 'public',
    bundle: true,
    splitting: true,
    format: 'esm',
    loader: {
      '.ttf': 'file',
      '.svg': 'text'
    },
    plugins: [
      sassPlugin()
    ]
  })
  .then((result) => {
    result.serve({
      servedir: 'public',
    }).then(({ host, port }) => {
      console.log('Serving at localhost:' + port)
    })
  })
  
}
