const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (env, argv) => {
    const config = {
        target: ['web'],
        devtool: argv.mode === 'development' ? 'source-map' : 'none',
        entry: {
            index: './src/index.ts',
            // separateFile: './src/2nd.js',
        },
        output: {
            filename: 'bundle-[name].js',
            path: path.resolve(__dirname, 'dist'),
            assetModuleFilename: 'asset/[name]-[hash][ext][query]',
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.scss'],
            plugins: [
                new TsConfigPathsPlugin(), // instead of webpack `alias` use TS `paths`
            ],
        },
        optimization: {
            moduleIds: 'deterministic',
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'all',
                    },
                },
            },
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.s?css$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        {
                            loader: 'style-loader',
                            options: { injectType: 'styleTag' },
                        },
                        'css-loader', // Translates CSS into CommonJS
                        'sass-loader', // Compiles Sass to CSS
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin({}),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/index.html'),
                inject: true,
            }),
        ],
    };

    console.log(config);

    return { ...config };
};
