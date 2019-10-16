const path = require( 'path' );
const nodeExternals = require( 'webpack-node-externals' );
const WebpackShellPlugin = require( 'webpack-shell-plugin' );

const { NODE_ENV = 'production' } = process.env;

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  mode: NODE_ENV,
  watch: NODE_ENV === 'development',
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  context: __dirname,
  externals: [ nodeExternals() ],
  output: {
    path: path.resolve( __dirname, 'build' ),
    filename: 'index.js'
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [ 'ts-loader' ]
      }
    ]
  },
  plugins: [
    new WebpackShellPlugin( {
      onBuildEnd: [ 'npm run run:dev' ]
    } )
  ]
}