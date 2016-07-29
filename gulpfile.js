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
 