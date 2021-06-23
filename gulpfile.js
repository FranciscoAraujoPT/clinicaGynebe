const postcss = require("gulp-postcss");
const gulp = require("gulp");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const useref = require("gulp-useref");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const gulpIf = require("gulp-if");
const concat = require("gulp-concat")
const del = require("del");

gulp.task("html", function () {
    return gulp.src("./html/*.html")
        .pipe(useref())
        .pipe(gulp.dest("build"))
});

gulp.task("css", function () {
    const plugins = [
        autoprefixer({ browsers: ["last 1 version"] }),
        cssnano()
    ];
    return gulp.src("./css/*.css")
        .pipe(concat("style.css"))
        .pipe(postcss(plugins))
        .pipe(gulp.dest("./build/css"));
});

gulp.task("js", function () {
    return gulp.src("./js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("build/js"))
})

gulp.task("images", function () {
    return gulp.src("images/**/*.+(png|jpg|gif|svg)")
        .pipe(imagemin())
        .pipe(gulp.dest("build/images"))
});

gulp.task("clean", function () {
    return del.sync("build");
})