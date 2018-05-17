const Gulp = require('gulp')
const Shell = require('gulp-shell')
const Nodemon = require('gulp-nodemon')
const Nightwatch = require('gulp-nightwatch')
const Del = require('del')

Gulp.task('default', ['start'])

Gulp.task('watch', () => {
  Gulp.watch('./lib/**/*.js', ['quality'])
})

Gulp.task('quality', Shell.task('./node_modules/.bin/standard && ./node_modules/.bin/lab -d -L -t 70'))

Gulp.task('test', Shell.task('./node_modules/.bin/standard && ./node_modules/.bin/lab -t 70'))

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

Gulp.task('clean', () => {
  Del(['dist'])
})

Gulp.task('pre-build', () => {
  Gulp.src(['bootstrap.js', 'package.json', 'README.md'])
    .pipe(Gulp.dest('dist'))
})

Gulp.task('build', ['clean', 'pre-build'], () => {
  Gulp.src(['lib/**/*'])
    .pipe(Gulp.dest('dist/lib'))
})
