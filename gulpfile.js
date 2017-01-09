
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
// const notify = require('gulp-notify');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');

// path configurations
const paths = {
  entry: 'server.js',
  linting: ['./**/*.js', '!node_modules/*'],
  tests: {
    specs: ['**/*.spec.js'],
    coverage: ['!node_modules/*', '!tests/*', './**/*.js']
  }
};

/**
 * default gulp task
 */
gulp.task('default', ['run'], () => {

});

/**
 * lint gulp task - lint code and fail if lint errors detected
 */
gulp.task('lint', () => {
  gulp.src(paths.linting)
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
    script: paths.entry, //`${paths.entry} | ./node_modules/.bin/bunyan`,
    ext: 'jsx js',
    env: { 'NODE_ENV': 'development' },
    ignore: ['ignored.js'],
    tasks: ['lint']
  })
  .on('restart', function() {
    console.log('restarted!');
  });
});

/**
 * code test coverage gulp task - run code coverage (optimally before tests)
 */
gulp.task('coverage', () => {
  return gulp.src(paths.tests.coverage, { base: '.' })
    // Covering files
    .pipe(istanbul({ includeUntested: true }))
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

/**
 * gulp mocha task: uses gulp to run mocha engine for tests
 */
// gulp.task('test', () => {
//   return gulp.src(paths.tests.coverage)
//     .pipe(istanbul({includeUntested: true}))
//     .pipe(istanbul.hookRequire())
//     .on('finish', () => {
//       return gulp.src(paths.tests.specs, { base: 'tests' })
//         .pipe(mocha({
//           reporter: 'nyan'
//         }))
//         .once('error', function() {
//           process.exit(1);
//         })
//         .once('end', function() {
//           process.exit();
//         })
//         .pipe(istanbul.writeReports({
//           dir: './assets/unit-test-coverage',
//           reporters: ['lcov'],
//           reportOpts: {dir: './tests/test-coverage'}
//         }))
//         // Enforce a coverage of at least 90%
//         .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
//     });
// });

gulp.task('test', () => {
  return gulp.src(paths.tests.specs, { base: 'tests' })
    .pipe(mocha({
      reporter: 'nyan'
    }))
    .once('error', function() {
      process.exit(1);
    })
    .once('end', function() {
      process.exit();
    });
});
