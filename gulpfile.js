let fs = require('fs')
let del = require('del')
let gulp = require('gulp')
let zip = require('gulp-zip')
// let gulpif = require('gulp-if')
let watch = require('gulp-watch')
let plumber = require('gulp-plumber')
let browserSync = require('browser-sync')
// js
let rollup = require('gulp-better-rollup')
let babel = require('rollup-plugin-babel')
// images
let imagemin = require('gulp-imagemin')
// style
let scss = require('gulp-sass')
let postcss = require('gulp-postcss')

// style task
gulp.task('styles', function() {
  return watch('./src/styles/**/*.scss', { ignoreInitial: false })
    .pipe(plumber())
    .pipe(scss())
    .pipe(
      postcss([
        require('postcss-import'),
        require('postcss-lazyimagecss'),
        require('cssnext'),
        require('postcss-pxtorem')({
          rootValue: 16,
          propList: ['*'],
          mediaQuery: false,
          minPixelValue: 2
        }),
        require('autoprefixer')({
          browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
        }),
        require('cssnano')
      ])
    )
    .pipe(gulp.dest('./dist/styles'))
})

// libs
gulp.task('libs', function() {
  return watch('./src/libs/**/*', {
    ignoreInitial: false
  }).pipe(gulp.dest('./dist/scripts'))
})

// scripts
gulp.task('scripts', function() {
  return watch('./src/scripts/**/*.js', { ignoreInitial: false })
    .pipe(
      rollup(
        {
          plugins: [babel()]
        },
        { format: 'iife' }
      )
    )
    .pipe(gulp.dest('./dist/scripts'))
})

// html
gulp.task('html', function() {
  return watch('./src/views/**/*.html', { ignoreInitial: false })
    .pipe(plumber())
    .pipe(gulp.dest('./dist/views'))
})

// start server
gulp.task('server', function() {
  browserSync({
    // 调用API
    files: ['./dist/**/*'],
    port: 8000,
    server: {
      baseDir: ['./dist'] // 监听当前路径
    },
    startPath: 'views/index.html',
    notify: {
      //自定制livereload 提醒条
      styles: [
        'margin: 0',
        'padding: 5px',
        'position: fixed',
        'font-size: 10px',
        'z-index: 9999',
        'bottom: 0px',
        'right: 0px',
        'border-radius: 0',
        'border-top-left-radius: 5px',
        'background-color: rgba(60,197,31,0.5)',
        'color: white',
        'text-align: center'
      ]
    }
  })
})

gulp.task('del', del.bind(null, './dist'))

gulp.task('default', ['html', 'styles', 'scripts', 'libs', 'server'])
