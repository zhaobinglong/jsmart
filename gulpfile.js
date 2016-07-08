var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require("gulp-uglify");


gulp.task('watch', function () {
  gulp.src('jsmart.js')
      .pipe(uglify()) //压缩
      .pipe(rename('jsmart.min.js'))
      .pipe(gulp.dest('dist'));
});


// 默认任务  监听文件变化
gulp.task('default', function(){
    // 监听文件变化
    gulp.watch('*.js', function(){
        gulp.run('watch');
    });
});
