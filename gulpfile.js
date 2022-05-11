(function() {
  // http://gulpjs.com
  // https://github.com/alferov/awesome-gulp
  var autoPrefix, cleanCss, concat, cssDest, cssSrc, data, del, destDir, gulp, htmlSrc, join, jsDest, jsSrc, moment, path, plumber, plumberErr, pug, pugDir, pugExcl, pugSrc, rename, resolveDeps, srcDir, styl, theDate, uglify;

  gulp = require('gulp');

  path = require('path');

  join = path.join;

  // config
  srcDir = join(__dirname, 'views');

  destDir = join(__dirname, 'dist');

  jsSrc = join(srcDir, 'js', 'bundle.js');

  jsDest = join(destDir, 'js');

  cssSrc = join(srcDir, 'styl', '*.styl');

  cssDest = join(destDir, 'css');

  pugDir = join(srcDir, 'pug');

  pugSrc = join(pugDir, '**', '*.pug');

  pugExcl = '!' + join(pugDir, 'lib', '**');

  htmlSrc = [pugSrc, pugExcl];

  // date for cache-busting
  moment = require('moment'); // https://momentjs.com

  theDate = moment().format('YYYYMMDDHHmmss');

  // errors
  // https://github.com/floatdrop/gulp-plumber
  plumber = require('gulp-plumber');

  plumberErr = function(err) {
    return console.log(err);
  };

  // clean
  // https://github.com/sindresorhus/del
  del = require('del');

  gulp.task('clean', function() {
    return del(['dist']);
  });

  // js
  // https://github.com/backflip/gulp-resolve-dependencies
  // https://github.com/contra/gulp-concat
  // https://github.com/terinjokes/gulp-uglify
  resolveDeps = require('gulp-resolve-dependencies');

  concat = require('gulp-concat');

  uglify = require('gulp-uglify');

  gulp.task('js', function() {
    return gulp.src(jsSrc).pipe(plumber({
      errorHandler: plumberErr
    })).pipe(resolveDeps()).pipe(concat(`bundle.min.${theDate}.js`)).pipe(uglify()).pipe(gulp.dest(jsDest));
  });

  // css
  // https://github.com/stevelacy/gulp-stylus
  // https://github.com/sindresorhus/gulp-autoprefixer
  // https://github.com/scniro/gulp-clean-css
  // https://github.com/hparra/gulp-rename
  styl = require('gulp-stylus');

  autoPrefix = require('gulp-autoprefixer');

  cleanCss = require('gulp-clean-css');

  rename = require('gulp-rename');

  gulp.task('css', function() {
    return gulp.src(cssSrc).pipe(plumber({
      errorHandler: plumberErr
    })).pipe(styl()).pipe(autoPrefix()).pipe(gulp.dest(cssDest)).pipe(cleanCss()).pipe(rename({
      suffix: `.min.${theDate}`
    })).pipe(gulp.dest(cssDest));
  });

  // html
  // https://github.com/colynb/gulp-data
  // https://github.com/pugjs/gulp-pug
  pug = require('gulp-pug');

  data = require('gulp-data');

  gulp.task('html', function() {
    return gulp.src(htmlSrc).pipe(plumber({
      errorHandler: plumberErr
    })).pipe(data(function(file) {
      return {
        cacheBust: theDate
      };
    })).pipe(pug()).pipe(gulp.dest(destDir));
  });

  // run tasks in order
  // and in parallel (arrays)
  gulp.task('default', gulp.series('clean', ['js', 'css', 'html'])); // optional, comment to disable

}).call(this);


//# sourceMappingURL=gulpfile.js.map
//# sourceURL=coffeescript