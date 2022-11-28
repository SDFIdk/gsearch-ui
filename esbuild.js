const entry_points = {
  search: 'src/components/search.js',
  style: 'src/index.css'
}

// Development mode watches for file changes and rebuilds
require('esbuild').serve({
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
  console.log(server)
  // Call "stop" on the web server to stop serving
  //server.stop()
})
