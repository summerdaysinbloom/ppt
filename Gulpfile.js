/*
  This is an EXAMPLE gulpfile.js
  You'll want to change it to match your project.
  Find plugins at https://npmjs.org/browse/keyword/gulpplugin
*/

var lr = require('tiny-lr'),
    gulp = require('gulp'),
	  minifycss = require('gulp-minify-css'),
	  watch = require('gulp-watch'),
    open = require("gulp-open"),
    refresh = require('gulp-livereload'),
    server= lr();

gulp.task("webcomponent", function(){
	gulp.src("./webcomponent.html")
	.pipe(open("<%file.path%>"), {app:"google-chrome"});
});

gulp.task('minifycss', function() {
	gulp.src('./webcomponentcss/*.css')
		.pipe(minifycss())
		.pipe(gulp.dest('./webcomponentminified/'))
		.pipe(refresh(server));
});

gulp.task('default', function() {
	gulp.run('webcomponent','minifycss');

	server.listen(35729, function (err) {
    	if (err) return console.log(err);

    	gulp.watch('./webcomponentcss/*.css', function (e) {
            gulp.run('minifycss');
        });

    });
});