var gulp = require('gulp')
var scanner = require('i18next-scanner')
var ts = require("gulp-typescript")
var tsProject = ts.createProject("tsconfig.json")

gulp.task(
  'i18next',
  function () {
    return tsProject
      .src()
      .pipe(tsProject())
      .js
      .pipe(scanner({
        lngs: ['en', 'de', 'pl'],
        resource: {
          loadPath: 'public/locales/{{lng}}.json',
          savePath: 'public/locales/{{lng}}.json'
        }
      }))
      .pipe(gulp.dest('.'))
  }
)