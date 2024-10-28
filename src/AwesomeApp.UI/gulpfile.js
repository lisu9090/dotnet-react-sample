var gulp = require('gulp')
var scanner = require('i18next-scanner')

gulp.task('i18next', function () {
  return gulp.src(['src/**/*.{ts,tsx}'])
    .pipe(scanner({
      lngs: ['en', 'de', 'pl'],
      resource: {
        // the source path is relative to current working directory
        loadPath: 'public/locales/{{lng}}.json',

        // the destination path is relative to your `gulp.dest()` path
        savePath: 'locales/{{lng}}.json'
      }
    }))
    .pipe(gulp.dest('public'))
})