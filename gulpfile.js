var gulp = require('gulp'); // importamos gulp
var sass = require('gulp-sass'); // importamos sass
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
// var concat = require('gulp-concat');
var browserify = require('browserify');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');
var sourcemaps= require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var imagemin = require('gulp-imagemin');
var responsive = require('gulp-responsive');


// config
var sassConfig = {
    compileSassTaskName: 'compile-sass',
    watchFiles: './src/scss/*.scss',
    entryPoint: './src/scss/style.scss',
    dest: './dist/'
};

var jsConfig = {
    concatJsTaskName: 'concat-js',
    watchFiles: './src/js/*.js',
    entryPoint: './src/js/main.js',
    concatFile: 'main.js',
    dest: './dist/'
};

var uglifyConfig = {
    uglifyTaskName: 'uglify',
    src: '/dist/main.js',
    dest: './dist/'
};

var imagesConfig = {
    imagesTaskName: "optimize-images",
    src: "src/img/*",
    dest: "./dist/img/",
    responsive: {
        'placeholder.jpg': [ //1450-720-670-350
            {
                width: 1024,
                rename: { suffix: '-1024px' }
            },
            {
                width: 720,
                rename: { suffix: '-720px' }
            },
            {
                width: 670,
                rename: { suffix: '-670px' }
            },
            {
                width: 350,
                rename: { suffix: '-350px' }
            }
        ],
        'yoda.jpeg': [ //1450-720-670-350
            {
                width: 1024,
                rename: { suffix: '-1024px' }
            },
            {
                width: 720,
                rename: { suffix: '-720px' }
            },
            {
                width: 670,
                rename: { suffix: '-670px' }
            },
            {
                width: 350,
                rename: { suffix: '-350px' }
            }
        ],
        '*.png': {
            width: '100%'
        }
    }
};



// definimos la tarea por defecto
gulp.task("default", [sassConfig.compileSassTaskName, jsConfig.concatJsTaskName, imagesConfig.imagesTaskName], function(){

    // arrancar el servidor de browser sync
    browserSync.init({
        //server: "./"
        proxy: "127.0.0.1:8000"     //Conectar browserSync con sparRest(Backend)
    });

    // cuando haya cambios en archivos scss, compila sass
    gulp.watch(sassConfig.watchFiles, [sassConfig.compileSassTaskName]);

    // cuando haya cambios en archivos js, los concatena
    gulp.watch(jsConfig.watchFiles, [jsConfig.concatJsTaskName]);

    // cuando se cambie el html, recarga el navegador
    gulp.watch('./*.html', function(){
        browserSync.reload();  // recarga navegador
        notify().write("Navegador recargado"); // mostramos notificación
    });
});

// compila sass
gulp.task(sassConfig.compileSassTaskName, function(){
    gulp.src(sassConfig.entryPoint)    // cargo el style.scss
    .pipe(sourcemaps.init())        //Empezamos a capturar los sourcemaps
    .pipe(sass().on('error', function(error){ // compilamos sass
        return notify().write(error); // si ocurre un error, mostramos notifiación
    }))
    .pipe(postcss([autoprefixer(), cssnano()]))     // autoprefija el css yh lo minifica
    .pipe(sourcemaps.write('./'))       //terminamos de capturar los sourcemaps
    .pipe(gulp.dest(sassConfig.dest))      // dejo el resultado en ./dist/
    .pipe(browserSync.stream())     // recargamos el CSS en el navegador
    .pipe(notify("SASS Compilado 🤘"));
});

// concatena js
gulp.task(jsConfig.concatJsTaskName, function(){
    gulp.src(jsConfig.entryPoint)    
    .pipe(tap(function(file){   // para cada archivo seleccionado
        // lo pasamos por browserify para importar los require
        file.contents = browserify(file.path, { debug:true }).bundle().on('error', function(error){
            return notify().write(error); // si ocurre un error javascript, lanza notificación
        });
    }))
    .pipe(buffer()) // convertimos a buffer para que funcione el siguiente pipe
    // .pipe(concat(jsConfig.concatFile))
    .pipe(sourcemaps.init({ loadMaps:true }))        //Empezamos a capturar los sourcemaps
    .pipe(uglify())     // minificamos el código js
    .pipe(gulp.dest(uglifyConfig.dest))
    .pipe(sourcemaps.write('./'))       //terminamos de capturar los sourcemaps
    .pipe(gulp.dest(jsConfig.dest))
    .pipe(notify("JS Concatenado 💪"))
    .pipe(browserSync.stream());
});

// minifica js
gulp.task(uglifyConfig.uglifyTaskName, function() {
    gulp.src(uglifyConfig.src)
    .pipe(uglify())
    .pipe(gulp.dest(uglifyConfig.dest))
    .pipe(notify("JS Minificado!!!!"));
});

// optimiza las imágenes
gulp.task(imagesConfig.imagesTaskName, function(){
    gulp.src(imagesConfig.src)
    .pipe(responsive(imagesConfig.responsive))  // genera las imágenes responsive
    .pipe(imagemin())   // optimiza el tamaño de las imagenes
    .pipe(gulp.dest(imagesConfig.dest));
});

