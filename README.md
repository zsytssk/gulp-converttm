# gulp-converttm  
这是一个插件用来将TextureMerger 生成的 spritesheet json 转化为pixi能使用的json  

## 使用  
```javascript  
var converttm = require('gulp-converttm');  

gulp.task('converttm', function () {  
  return gulp.src(dirs.src + '/**/*.json')  
    .pipe(converttm())  
    .pipe(gulp.dest(dirs.dist));  
});  

```  
