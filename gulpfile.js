var gulp = require('gulp');


outputDir='./'


const include = require('gulp-include')
const sass = require('gulp-sass')(require('sass'))
const minify  = require('gulp-minify');
concat        = require('gulp-concat');
 
gulp.task('templates',async function(done) {
  gulp.src('dev/**/*.html')
    .pipe(include())
      .on('error', console.log)
    .pipe(gulp.dest(outputDir))
})

gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
      'dev/js/**/*.js'
      ])
      .pipe(concat('common.js')) // Собираем их в кучу в новом файле 
      .pipe(minify()) // Сжимаем JS файл
      .pipe(gulp.dest(outputDir+'assets/js/')); // Выгружаем в папку app/js
  });

gulp.task('sass', function(){
    return gulp.src('dev/css/**/*.scss') // Берем все sass файлы из папки sass и дочерних, если таковые будут
      .pipe(sass())
      .pipe(gulp.dest(outputDir+'assets/css/'))
  });




gulp.task('watch', function() {
	gulp.watch('dev/js/**/*.js', gulp.parallel('scripts'));
  gulp.watch('dev/**/*.html', gulp.parallel('templates'));
  gulp.watch('dev/css/**/*.scss', gulp.parallel('sass'));
});