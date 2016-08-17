'use strict';

var gulp = require('gulp'),
  os = require('os'),
  zip = require('gulp-zip'),
  s3 = require('gulp-s3-upload')(),
  fs = require('fs');

var packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

var s3Config = {
  Bucket: 'tascent-maven-repo-002',
  ACL: 'public-read',
  uploadNewFilesOnly: true,
  keyTransform: function(filename) {
    return 'test/'+packageJson.version+'/'+filename;
  }
};

gulp.task('deploy:prepare', ['build:dist'], function() {
  return gulp.src('dist/**/*')
    .pipe(gulp.dest(os.homedir() + '/tascent_tmp/dist'));
});

gulp.task('deploy:perform', ['build:dist'], function() {
  return gulp.src('dist/**/*')
    .pipe(zip('dist.zip'))
    .pipe(gulp.dest(os.homedir() + '/tascent_tmp/dist'))
    .pipe(s3(s3Config, {
      maxRetries: 2
    }));
});
