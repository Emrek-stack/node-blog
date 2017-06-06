var webpack = require("webpack");
var VENDOR_PATH = __dirname + '/node_modules';
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var config = {
    addExternal: function(name, globalVar) {
        this.externals[name] = globalVar;
        this.entry.vendors.push(name);
    },
    /* for vendors we don't have a CDN for */
    addVendor: function(name, path) {
        this.resolve.alias[name] = path;
        this.entry.vendors.push(name);
    },
    addPlugin: function(plugin) {
        this.plugins.push(plugin);
    },
    entry: {
        app: ['./public/reactapp/index.tsx'],
        vendors: [],
    },
    // entry: './public/reactapp/index.tsx',
    devtool: 'source-map',
    output: {
        path: './public/javascripts',
        filename: 'bundle.js'
    },
    output: {
        path: './public/javascripts',
        filename: 'bundle.min.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({ minimize: true }),
        // new webpack.ProvidePlugin({
        //     'Router': 'react-router'

        // })
    ],
    resolve: {
        alias: {},
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    externals: {
        // "jquery": "$",
        // 'react': 'React',
        // 'react-dom': 'ReactDOM',
        // "react-router": "Router"
    },
    module: {
        noParse: ['react', 'jquery'],
        loaders: [{
            test: /\.tsx?$/,
            loader: "awesome-typescript-loader"
        }],
        preLoaders: [

            {
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    }
}

config.addExternal('jquery', '$');
config.addExternal('react', 'React');
config.addExternal('react-dom', 'ReactDOM');

config.addVendor('react-router', VENDOR_PATH + '/react-router/umd/ReactRouter.js')
config.addVendor('react-bootstrap', VENDOR_PATH + '/react-bootstrap/dist/react-bootstrap.js');
//config.addVendor('react-router-bootstrap', VENDOR_PATH + '/react-router-bootstrap/lib/index.js');

config.addPlugin(new CommonsChunkPlugin('vendors', 'vendors.js'));

module.exports = config;