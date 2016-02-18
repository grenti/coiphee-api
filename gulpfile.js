
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
// const notify = require('gulp-notify');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

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
    env: { 'NODE_ENV': 'development' },
    ignore: ['ignored.js'],
    tasks: ['lint']
  })
  .on('restart', function() {
    console.log('restarted!');
  });
});

/**
 * gulp mocha task: uses gulp to run mocha engine for tests
 */
gulp.task('test', () => {
  return gulp.src(['**/*.spec.js'], { base: 'tests' })
        .pipe(mocha({
          reporter: 'nyan',
          env: 'test'
        }))
        .once('error', function() {
          process.exit(1);
        })
        .once('end', function() {
          process.exit();
        });
});
