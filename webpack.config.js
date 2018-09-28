const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/main/ts/index.tsx",
    output: {
        filename: "bundle.js"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    devServer: {
        contentBase: './', 
        //publicPath: '/dist/'
        //,https: true
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"        
    }, 
    plugins: [
        new CopyWebpackPlugin([
            { from: 'index.css', to: './' }
        ]), 
        new HtmlWebpackPlugin({template: 'index.html', inject: false}), 
        new HtmlReplaceWebpackPlugin([
            {
                pattern: './node_modules/react/umd/react.development.js',
                replacement: 'https://unpkg.com/react@16/umd/react.production.min.js'
            },
            {
                pattern: './node_modules/react-dom/umd/react-dom.development.js',
                replacement: 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js'
            }
        ])
    ]
};