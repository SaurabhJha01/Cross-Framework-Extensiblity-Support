const gulp = require('gulp');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
 
gulp.task('scripts', function() {
    return gulp.src('./dist/baseApp/*.js')
      .pipe(concat('all.js'))
      .pipe(gulp.dest('./distConcat/'));
  });

  gulp.task('minifyBaseApp', function() {
    return gulp.src('./distConcat/all.js')
      .pipe(minify())
      .pipe(gulp.dest('./distMinify/'));
  });

// gulp.task('minifyBaseApp', function() {
//     return gulp.src('./dist/baseApp/*.js')
//       .pipe(minify())
//       .pipe(gulp.dest('./distMinify/'));
//   });

//     gulp.task('concatBaseApp', function() {
//     return gulp.src('./distMinify/*.js')
//       .pipe(concat('all.js'))
//       .pipe(gulp.dest('./distConcat/'));
//   });

// gulp.task('concatWebElements', function() {
//   return gulp.src('./webComponents/*.js')
//     .pipe(concat('web-components-collection.js'))
//     .pipe(gulp.dest('./webComponents/'));
// });

