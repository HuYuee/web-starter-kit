var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-clean-css'),
    browsersync = require('browser-sync').create(),
    imagemin = require('gulp-imagemin'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    del = require('del'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace'),
    pathLess = require('path'),
    less = require('gulp-less'),
    renderFun = require('./bin/render.js');


var path = {
    dist: './dist/',
    cssfolder: './src/css/',
    cssout: './dist/css',
    css: './src/css/**/*.css',
    less: './src/less/**/*.less',
    htmlout: './dist/html',
    html: './src/html/**/*.html',
    jsout: './dist/js',
    js: './src/js/**/*.js',
    imageout: './dist/images',
    image: './src/images/**/*',
    publicout: './dist/public',
    public: './src/public',
    vendorout: './dist/vendor',
    vendor: './src/vendor/**/*',
    confout: './dist/conf',
    conf: './src/conf/**/*'
    // fontout: './dist/fonts',
    // font:'./src/fonts/**'
};


var widgetPath = {
    src: ['./src/widget/**/*', './src/layout/**/*']
}

var publicPath = {
    less: './public/less/**/*.less',
    js: './public/js/**/*.js'
}

var showError = function(err) {
    console.log('\n错误文件:', err.file, '\n错误行数:', err.line, '\n错误信息:', err.message);
}

/*output dist/html*/
var htmlOut = function(htmlPath, htmlOutPath) {
    return gulp.src(htmlPath)
        .pipe(gulp.dest(htmlOutPath))
}
gulp.task('html', function() {
    htmlOut(path.html, path.htmlout)
});

// 页面后端模板引擎渲染
gulp.task('render', function() {
    renderFun();
    gulp.watch([widgetPath.src]).on('change', function() {
        renderFun();
    })


})


/*监听less文件，编译输出src/css目录*/
var lessCompile = function(lessPath, cssFolder) {
    return gulp.src(lessPath)
        .pipe(sourcemaps.init())
        .pipe(less(
            /*{
            			paths: [ pathLess.join(__dirname, './reset.less') ]
            		}*/
        )).on('error', function(err) {
            showError(err)
        })
        .pipe(autoprefixer([
            'ie >= 9',
            'edge >= 20',
            'ff >= 44',
            'chrome >= 48',
            'safari >= 8',
            'opera >= 35',
            'ios >= 8'
        ]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cssFolder))
        .on('end', function() {
            browsersync.reload();
        })
}
gulp.task('less', function() {
    lessCompile(path.less, path.cssfolder);
})
gulp.task('watchLess', ['less'], function() {
    gulp.watch(publicPath.less, ['less'])
})

/*output dist/css*/
var cssOut = function(cssPath, cssOutPath) {
    return gulp.src(cssPath)
        // .pipe(sourcemaps.init())
        .pipe(cleancss({
            compatibility: 'ie8'
        }))
        // .pipe(rename({
        //     suffix: '.min'
        // }))
        // .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(cssOutPath))
}
gulp.task('css', ['less'], function() {
    cssOut(path.css, path.cssout)
})



/*output dist/script*/
var scriptOut = function(jsPath, jsOutPath) {
    return gulp.src(jsPath)
        .pipe(uglify())
        // .pipe(sourcemaps.init())
        // .pipe(rename({
        //     suffix: '.min'
        // }))
        // .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(jsOutPath))
}
gulp.task('script', function() {
    scriptOut(path.js, path.jsout)
})

/* output images*/
var imagesOut = function(imagePath, imageOutPath) {
    return gulp.src(imagePath)
        .pipe(imagemin())
        .pipe(gulp.dest(imageOutPath))
}
gulp.task('images', function() {
    imagesOut(path.image, path.imageout);
})

/* output public*/
var publicOut = function(publicPath, publicOutPath) {
    gulp.src(publicPath + '/js/*')
        .pipe(uglify())
        .pipe(gulp.dest(publicOutPath + '/js'));

    gulp.src(publicPath + '/font/*')
        .pipe(gulp.dest(publicOutPath + '/font'));
}
gulp.task('public', function() {
    publicOut(path.public, path.publicout)
})

/* output vendor*/
var vendorOut = function(vendorPath, vendorOutPath) {
    return gulp.src(vendorPath)
        .pipe(gulp.dest(vendorOutPath))
}
gulp.task('vendor', function() {
    vendorOut(path.vendor, path.vendorout)
})
gulp.task('conf', function() {
    vendorOut(path.conf, path.confout)
})

/* liveload */
gulp.task('live', ['watchLess', 'render'], function() {
    browsersync.init({
        port: 3333,
        // startPath:'./src',
        server: {
            baseDir: './',
            index: 'src/html/index.html',
            directory: true
        }
    })
    gulp.watch(path.less, ['less'])
    gulp.watch(path.js).on('change', browsersync.reload)
    gulp.watch(path.html).on('change', browsersync.reload)
    gulp.watch(publicPath.js).on('change', browsersync.reload)
    gulp.watch(widgetPath.src).on('change', browsersync.reload)


})


/*delete dist directory*/
gulp.task('del', function() {
    del(path.dist);
});
gulp.task('output', ['html', 'css', 'script', 'images', 'public', 'vendor', 'conf'])
gulp.task('default', ['live']);
gulp.task('cdn', ['output'])
