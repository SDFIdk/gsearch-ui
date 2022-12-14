import esbuild from 'esbuild'

const entry_points = {
  search: './index.js',
  style: './src/index.css'
}


if (process.env.NODE_ENV === 'development') {

  // Development mode watches for file changes and rebuilds
  esbuild.serve({
    servedir: 'public',
  }, {
    entryPoints: entry_points,
    loader: {
      '.ttf': 'file'
    },
    outdir: 'public',
    bundle: true,
    format: 'esm'
  }).then(server => {
    console.log('Running development server')
    console.log(server)
    // Call "stop" on the web server to stop serving
    //server.stop()
  })

} else {

  // Production build
  esbuild.build({
    entryPoints: entry_points,
    loader: {
      '.ttf': 'file'
    },
    outdir: 'public',
    bundle: true,
    format: 'esm',
    minify: true,
    sourcemap: true
  })
  .then((response) => {
    console.log('Build finished 👍')
  })
  .catch(() => process.exit(1))

}
