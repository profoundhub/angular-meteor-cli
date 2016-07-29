var camelCase = require('lodash.camelcase');
var upperFirst = require('lodash.upperfirst');
 
module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + '/www/js',
    filename: 'app.bundle.js'
  },
  externals: [
    {
      'angular': 'angular',
      'cordova': 'cordova',
      'ionic': 'ionic'
    },
    resolveExternals
  ],
  target: 'web',
  devtool: 'source-map',
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['add-module-exports']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|www)/,
      loader: 'babel'
    }]
  },
  resolve: {
    extensions: ['', '.js'],
    alias: {
      lib: __dirname + '/www/lib'
    }
  }
};
 
function resolveExternals(context, request, callback) {
  return cordovaPlugin(request, callback) ||
         callback();
}
 
function cordovaPlugin(request, callback) {
  var match = request.match(/^cordova\/(.+)$/);
  var plugin = match && match[1];
 
  if (plugin) {
    plugin = camelCase(plugin);
    plugin = upperFirst(plugin);
    callback(null, 'this.cordova && cordova.plugins && cordova.plugins.' + plugin);
    return true;
  }
}
NOTE: Since we don't want to digress from this tutorial's subject, we won't go into details about Webpack's config. For more information, see reference.
We would also like to initiate Webpack once we build our app. All our tasks are defined in one file called gulpfile.js, which uses gulp's API to perform and chain them.

Let's edit our gulpfile.js accordingly:

1.2  Add webpack task to gulpfile gulpfile.js »
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
 
45
46
47
48
49
50
51
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var webpack = require('webpack');
 
var webpackConfig = require('./webpack.config');
 
var paths = {
  webpack: ['./src/**/*.js', '!./www/lib/**/*'],
  sass: ['./scss/**/*.scss']
};
 
gulp.task('default', ['webpack', 'sass']);
 
gulp.task('webpack', function(done) {
  webpack(webpackConfig, function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }
 
    gutil.log('[webpack]', stats.toString({
      colors: true
    }));
 
    done();
  });
});
 
gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
...some lines skipped...
});
 
gulp.task('watch', function() {
  gulp.watch(paths.webpack, ['webpack']);
  gulp.watch(paths.sass, ['sass']);
});