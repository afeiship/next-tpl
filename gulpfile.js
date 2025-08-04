const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const { NxScripts, CleanRegistry } = require('@jswork/gulp-registry');

const task1 = new CleanRegistry();
const task2 = new NxScripts({ name: 'qs', classify: false });

[task1, task2].forEach(gulp.registry);


gulp.task('umd', () => {
  return gulp
    .src('src/index.js') // 保存上面的 UMD 代码为 src/nx-tpl.js
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.umd' }))
    .pipe(gulp.dest('dist'));
});


gulp.task('default', gulp.series(['clean', 'nx:scripts', 'umd']));
