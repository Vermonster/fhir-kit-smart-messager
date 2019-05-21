// plugins that we are going to use
import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import resolve from 'rollup-plugin-node-resolve';

// list of plugins used during building process
const plugins = targets => ([
  // use Babel to transpile to ES5
  babel({
    // ignore node_modules/ in transpilation process
    exclude: 'node_modules/**',
    // ignore .babelrc (if defined) and use options defined here
    babelrc: false,
    // use recommended babel-preset-env without es modules enabled
    // and with possibility to set custom targets e.g. { node: '8' }
    presets: [['env', { modules: false, targets }]],
    // solve a problem with spread operator transpilation https://github.com/rollup/rollup/issues/281
    plugins: [ 'babel-plugin-transform-object-rest-spread' ],
    // removes comments from output
    comments: false,
  })
]);

// packages that should be treated as external dependencies, not bundled
const external = []; // e.g. ['axios']

export default [{
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    name: 'SmartMessenger',
    format: 'iife',
    sourcemap: false
  },
  plugins: [ resolve({ browser: true}) ]
}, {
  input: 'src/index.js',
  output: {
    file: 'dist/index.min.js',
    name: 'SmartMessenger',
    format: 'iife',
    sourcemap: true
  },
  plugins: [ minify(), resolve({ browser: true}) ]
}];
