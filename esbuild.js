const entry_points = {
  gsearch: 'src/views/gsearch.js',
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
  bundle: true
}).then(server => {
  console.log(server)
  // Call "stop" on the web server to stop serving
  //server.stop()
})
