'use strict';

var Transform = require('readable-stream/transform');
var rs = require('replacestream');
var fs = require('fs');

module.exports = function (search, replacement, options) {
  return new Transform({
    objectMode: true,
    transform: function (file, enc, callback) {
      if (file.isNull()) {
        console.log('hello world isNull');
        return callback(null, file);
      }

      function doReplace() {
        if (file.isStream()) {
          console.log('hello world isStream');
          file.contents = file.contents.pipe(rs(search, replacement));
          return callback(null, file);
        }

        if (file.isBuffer()) {
          console.log('start: ' + String(file.contents));
          var texureMergerJson = JSON.parse(String(file.contents));
          var resultJson = {
            "frames": {},
            "meta": {}
          };
          resultJson.meta.image = texureMergerJson.file;
          for (var key in texureMergerJson.frames) {
            var iframe_TM = texureMergerJson.frames[key];
            resultJson.frames[key] = {
              "frame": {
                "x": iframe_TM.x,
                "y": iframe_TM.y,
                "w": iframe_TM.w,
                "h": iframe_TM.h
              },
              "sourceSize": {
                "w": iframe_TM.sourceW,
                "h": iframe_TM.sourceH
              }
            }
          };
          file.contents = new Buffer(JSON.stringify(resultJson));
          console.log(String('end'));
          return callback(null, file);
        }

        callback(null, file);
      }

      doReplace();
    }
  });
};
