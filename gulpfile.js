const gulp = require('gulp');
const { NxScripts, CleanRegistry } = require('@jswork/gulp-registry');

const task1 = new CleanRegistry();
const task2 = new NxScripts({ name: 'qs', classify: false });

[task1, task2].forEach(gulp.registry);

gulp.task('default', gulp.series(['clean', 'nx:scripts']));
