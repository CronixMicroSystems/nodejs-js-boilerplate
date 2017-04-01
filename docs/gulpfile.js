var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css');

gulp.task('scripts', function () {
  gulp.src([
    // App
    'js/app.js',

    // Config
    'js/config/config.js',
    'js/config/routers.js',
    'js/config/sql.js',

    // Utils
    'js/utils/Validator.js',
    'js/utils/Requester.js',
    'js/utils/Data.js',

    // Methods
    'js/methods/Auth.js',

    // Controllers
    'js/controllers/AppController.js',
    'js/controllers/MethodController.js',
    'js/controllers/DocumentationController.js',
    'js/controllers/SupportController.js',
    'js/controllers/UpdatesController.js',
  ])
    .pipe(concat('app.min.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('dist'));
});

gulp.task('styles', function () {
  gulp.src([
    'css/helpers.css',
    'css/style.css'
  ])
    .pipe(concat('app.min.css'))
    .pipe(cleanCss())
    .pipe(gulp.dest('dist'));
});

gulp.task('libs', function () {
  gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/angular/angular.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/angular-bootstrap/ui-bootstrap.min.js',
    'node_modules/angular-bootstrap/ui-bootstrap-tpls.min.js',
    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
    'node_modules/angular-resource/angular-resource.min.js',
    'node_modules/angular-xeditable/dist/js/xeditable.min.js',
    'node_modules/angular-storage/dist/angular-storage.min.js',
    'node_modules/validator/validator.min.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('build', [
  'scripts',
  'styles',
  'libs'
]);

gulp.task('watch', function () {
  gulp.watch([], ['scripts']);
  gulp.watch([], ['styles']);
});

gulp.task('default', ['build']);