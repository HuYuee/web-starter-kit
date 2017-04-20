require.config({
    baseUrl: "../",
    paths: {
        style: "vendor/require/css.min",
        jquery: "vendor/jquery/jquery.min",
        template: "vendor/artTemplate/template",
        mock: "vendor/mockjs/mock.min",
        data: "data/data",
        util: "public/js/util",
        index: "js/index/index"
    },
    shim: {
        util: {
            deps: ["data"]
        },
        data: {
            deps: ["mock"]
        },
        index: {
            deps: ["style!css/page/index.css"]
        }
    }
});
