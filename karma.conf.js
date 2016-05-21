module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        singleRun: true,
        files: [
            {
                pattern: 'tests.webpack.js',
                watched: false
            }
        ],
        frameworks: ['mocha', 'chai'],
        preprocessors: {
            'tests.webpack.js': ['webpack', 'babel']
        },
        babelPreprocessor: {
            options: {
                presets: ['es2015']
            }
        },
        reporters: ['dots'],
        webpack: {
            module: require('./webpack.config.js').modules
        },
        webpackServer: {
            noInfo: true
        }
    });
};
