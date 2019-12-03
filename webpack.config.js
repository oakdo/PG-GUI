const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + 'dist',
        // publicPath: '/',
        filename: 'bundle.js'
    },
    mode: 'development',
    devServer: {
        // contentBase: '/dist'
        publicPath: '/',  
        compress: true,
        port: 8000,
    },
    module: {
        rules: [ 
            {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          }
        ]
    }
}