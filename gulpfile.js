const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const { NxScripts, CleanRegistry } = require('@jswork/gulp-registry');

// Rollup 相关
const rollup = require('@rollup/stream');
const source = require('vinyl-source-stream'); // 让 rollup 流兼容 gulp
const buffer = require('vinyl-buffer'); // 转为 buffer 以便 uglify

// 清理和脚本任务
const task1 = new CleanRegistry();
const task2 = new NxScripts({ name: 'nx-tpl', classify: false });

[task1, task2].forEach(gulp.registry);

// UMD 打包任务（通过 Rollup）
gulp.task('umd', () => {
  return rollup({
    input: 'src/index.js', // 入口文件
    external: ['@jswork/next', 'jquery'], // 外部依赖，不打包进去
    output: {
      format: 'umd',
      name: 'nx.tpl', // 全局变量名：window['nx.tpl']
      globals: {
        '@jswork/next': 'nx',
        jquery: '$'
      },
      indent: false
    }
  })
    .pipe(source('index.js', 'src')) // 转为 vinyl 文件流
    .pipe(buffer()) // 转为 buffer（uglify 需要）
    .pipe(gulp.dest('dist')) // 输出未压缩版
    .pipe(uglify()) // 压缩
    .pipe(rename({ suffix: '.umd' })) // 重命名为 .min.js
    .pipe(gulp.dest('dist')); // 输出压缩版
});

// 默认任务
gulp.task('default', gulp.series(['clean', 'nx:scripts', 'umd']));
