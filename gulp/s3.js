'use strict';

var gulp = require('gulp'),
  s3 = require('gulp-s3-upload')();

gulp.task('s3:upload', function() {
  gulp.src('dist/index.html')
    .pipe(s3({
      Bucket: 'tascent-maven-repo-002',
      ACL: 'public-read',
      keyTransform: function(filename) {
        return 'test/'+filename;
      }
    }, {
      maxRetries: 2
    }));
});
