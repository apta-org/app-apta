const gulp = require('gulp')
const shell = require('gulp-shell')
const babel = require('gulp-babel')
const lab = require('gulp-lab')
const nodemon = require('gulp-nodemon')
const nightwatch = require('gulp-nightwatch')

gulp.task('default', ['start'])

gulp.task('watch', () => {
  gulp.watch('./lib/**/*.js', ['quality'])
})

gulp.task('quality', () => {
  gulp.src(['**/*.js', '!./node_modules/**'])
    .pipe(babel())
    .pipe(lab({
      args: '-dL',
      opts: {
        emitLabError: true
      }
    }))
})

gulp.task('test', () => {
  gulp.src('./test')
    .pipe(babel())
    .pipe(lab({
      args: '-a code -t 100 -v -C -S -T ./node_modules/lab-babel -I __core-js_shared__',
      opts: {
        emitLabError: true
      }
    }))
})

gulp.task('cucumber', (callback) => {
  gulp.src('')
    .pipe(nightwatch({
      configFile: './nightwatch.conf.js'
    }))
    .on('end', callback)
})

gulp.task('e2e', ['cucumber'], shell.task('node ./test-automation/hooks/create-html-report.js'))

gulp.task('start', () => {
  nodemon({ script: 'bootstrap.js', ext: 'js' })
})
