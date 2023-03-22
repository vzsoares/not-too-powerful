const esbuild = require('esbuild');
const tsPaths = require('esbuild-ts-paths');

esbuild.build({
  entryPoints: ['app.ts'],
  platform: 'node',
  bundle: true,
  minify: true,
  outfile: 'build/out.js',
  packages: 'external',
  plugins: [tsPaths('./tsconfig.json')],
});
