const Gulp = require('gulp')
const Shell = require('gulp-shell')
const Babel = require('gulp-babel')
const Lab = require('gulp-lab')
const Nodemon = require('gulp-nodemon')
const Nightwatch = require('gulp-nightwatch')

Gulp.task('default', ['start'])

Gulp.task('watch', () => {
  Gulp.watch('./lib/**/*.js', ['quality'])
})

Gulp.task('quality', () => {
  // Gulp.src(['**/*.js', '!./node_modules/**'])
  Gulp.src('./test')
    .pipe(Babel())
    .pipe(Lab({
      args: '-d -L -C -S -T ./node_modules/lab-babel -I __core-js_shared__',
      opts: {
        emitLabError: true
      }
    }))
})

Gulp.task('test', () => {
  Gulp.src('./test')
    .pipe(Babel())
    .pipe(Lab({
      args: '-L -a code -t 100 -v -C -S -T ./node_modules/lab-babel -I __core-js_shared__',
      opts: {
        emitLabError: true
      }
    }))
})

Gulp.task('cucumber', (callback) => {
  Gulp.src('')
    .pipe(Nightwatch({
      configFile: './nightwatch.conf.js'
    }))
    .on('end', callback)
})

Gulp.task('e2e', ['cucumber'], Shell.task('node ./test-automation/hooks/create-html-report.js'))

Gulp.task('seed', Shell.task('node node_modules/.bin/md-seed run'))

Gulp.task('start', () => {
  Nodemon({ script: 'bootstrap.js', ext: 'js' })
})
