
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
// const notify = require('gulp-notify');
const eslint = require('gulp-eslint');

/**
 * default gulp task
 */
gulp.task('default', ['run'], () => {

});

/**
 * lint gulp task - lint code and fail if lint errors detected
 */
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

/**
 * server restart gulp task: uses nodemon to restart after changes detected
 */
gulp.task('run', () => {
  nodemon({
    script: 'server.js',
    ext: 'html js',
    ignore: ['ignored.js'],
    tasks: ['lint']
  })
  .on('restart',
    /**
     * restart event function
     */
    () => {
      console.log('restarted!');
    });
});
