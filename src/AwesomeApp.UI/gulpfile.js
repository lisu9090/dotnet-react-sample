import { gulp as i18nextParser } from 'i18next-parser'

gulp.task(
  'i18next', 
  () => {
    gulp
      .src('src/**')
      .pipe(new i18nextParser({
        locales: ['en', 'de', 'pl'],
        output: 'public/locales/$LOCALE.json',
      }))
      .pipe(gulp.dest('./'))
  }
)