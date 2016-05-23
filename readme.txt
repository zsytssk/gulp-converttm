-? jsonhash meta 中的参数有什么意义  

-? gulp 如何引用本地文件  
-> 插件文件夹有一个template.json 我要想在插件中引用需要怎么办  

-? file.isStream()  
-> 这个是做什么的,我的没有用到  

-? 开发gulp-replace  
-| "concat-stream" "mocha" "should" "vinyl" 这些事做什么的  
-> https://github.com/lazd/gulp-replace/blob/master/test/realworld.js  

```javascript  

  var PluginError = require('gulp-util').PluginError;  

  // consts  
  var PLUGIN_NAME = 'gulp-example';  

  module.exports = function() {  
      return through.obj(function(file, encoding, callback) {  
          if (file.isNull()) {  
              // nothing to do  
              return callback(null, file);  
          }  

          if (file.isStream()) {  
              // file.contents is a Stream - https://nodejs.org/api/stream.html  
              this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));  

              // or, if you can handle Streams:  
              //file.contents = file.contents.pipe(...  
              //return callback(null, file);  
          } else if (file.isBuffer()) {  
              // file.contents is a Buffer - https://nodejs.org/api/buffer.html  
              this.emit('error', new PluginError(PLUGIN_NAME, 'Buffers not supported!'));  

              // or, if you can handle Buffers:  
              //file.contents = ...  
              //return callback(null, file);  
          }  
      });  
  };  

```