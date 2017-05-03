require.config({
    baseUrl: "../",
    paths: {
        style: "vendor/require/css.min",
        jquery: "vendor/jquery/jquery.min",
        template: "vendor/artTemplate/template",
        mock: "vendor/mockjs/mock.min",
        data: "data/data",
        index: "js/index/index",
        page1: "js/page1/page1"
    },
    shim: {
        data: {
            deps: ["mock"]
        },
        index: {
            deps: ["style!css/page/index.css"]
        },
        page1: {
            deps: ["style!css/page/page1.css"]
        }
    }
});
