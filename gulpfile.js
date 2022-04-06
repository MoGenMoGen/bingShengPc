"use strict";

var gulp = require('gulp');
var scp2 = require('gulp-scp2');
var sequence = require('run-sequence');

gulp.task('dev', function(){
    return gulp.src('buildDist/**')
        .pipe(scp2({
            host: '47.101.167.43',
            username: 'root',
            password: 'sinovat_ocean@2020',
            dest: '/usr/local/tomcat/sinovat/web2/sinovat'
        }))
        .on('error', function(err) {
            throw err;
        });
});

gulp.task('default', function(done){
    sequence(
        'dev',
        done
    )
});
