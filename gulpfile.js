let gulp = require('gulp')
let concat = require('gulp-concat')
let minify = require('gulp-minify')
let merge = require('merge-stream')

let templates = ['template1', 'template2'];
let sides = ['front', 'back'];

function _merge(templateNumber, side) {
    gulp.src([`./src/${side}.js`, `./src/template${templateNumber}/${side}.js`])
        .pipe(concat(`${side}.js`))
        .pipe(gulp.dest(`./dist/template${templateNumber}/`))
}


gulp.task('merge', function () {

    let tasks = templates.map(template => {
        return sides.map(side => {
            return gulp.src([`./src/${side}.js`, `./src/${template}/${side}.js`])
                .pipe(concat(`${side}.js`))
                .pipe(gulp.dest(`./dist/${template}/`));
        });
    });

    return merge(tasks);
});

gulp.task('minify', function () {

    let tasks = templates.map(template => {
        return gulp.src(`./dist/${template}/*.js`)
            .pipe(minify({
                noSource: true
            }))
            .pipe(gulp.dest(`./dist/${template}/minified/`));
    });

    return merge(tasks);
});

gulp.task('html', function () {

    let tasks = templates.map(template => {
        return gulp.src(`./src/${template}/*.html`)
            .pipe(gulp.dest(`./dist/${template}/`))
    });

    return merge(tasks);
});

gulp.task('css', function () {
    let tasks = templates.map(template => {
        return gulp.src(`./src/${template}/*.css`)
            .pipe(gulp.dest(`./dist/${template}/`));
    })

    return merge(tasks);
});

gulp.task('default', gulp.series('merge', 'minify', 'html', 'css'));
