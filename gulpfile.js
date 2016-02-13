'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const notify = require('gulp-notify');
const eslint = require('gulp-eslint');

gulp.task('default', ['run'], () => {

});

gulp.task('lint', () => {
  gulp.src(['./**/*.js', '!node_modules/*'])
  .pipe(eslint())
  // eslint.format() outputs the lint results to the console.
  // Alternatively use eslint.formatEach() (see Docs).
  .pipe(eslint.format())
  // To have the process exit with an error code (1) on
  // lint error, return the stream and pipe to failAfterError last.
  .pipe(eslint.failAfterError());
});

gulp.task('run', () => {
  nodemon({
    script: 'server.js',
    ext: 'html js',
    ignore: ['ignored.js'],
    tasks: ['lint']
  })
  .on('restart', () => {
      console.log('restarted!');
  });
});
