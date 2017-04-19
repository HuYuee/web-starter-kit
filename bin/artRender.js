var fs = require("fs");
var fse = require("fs-extra");
var path = require("path");
var template = require("art-template");

var artRenderFun = function() {
    /**
     * 模板引擎设置项：
     * cache: 关闭模板引擎渲染缓存
     * openTag,closeTag: 修改开关标签，支持react组件'{{}}'
     */
    template.config("cache", false);
    template.config("openTag", "{{{");
    template.config("closeTag", "}}}");
    template.config("escape", false);

    var rederData = {};
    var env = process.cwd();

    var middlePath = "src/layout-data/";
    var outPath = "src/html/";
    var templPath = path.join(env, "src/templateHtml/templdetails");
    var rootDir = path.join(env, middlePath);
    if (fs.existsSync(rootDir)) {
        var pageList = fs.readdirSync(rootDir);
        pageList.forEach(function(pageJson) {
            var isJson = /\.json$/.test(pageJson);
            if (isJson) {
                var data = {};
                var jsonPath = path.join(rootDir, pageJson);
                //var htmlPath = path.join(rootDir, pageJson.replace('json', 'html')).replace('layout-data', 'layout');
                fs.exists(templPath, function(exists) {
                    fse.readJson(jsonPath, function(err, jsonobj) {
                        if (jsonobj != undefined) {
                            data = jsonobj;
                        } else {
                            data = {};
                        }

                        var htmlRender = template(templPath, data);
                        var outFilePath = path.join(
                            env,
                            outPath,
                            pageJson.replace("json", "html")
                        );
                        fse.outputFile(
                            outFilePath,
                            htmlRender,
                            "utf-8",
                            function() {
                                console.log(outFilePath, "渲染完毕");
                            }
                        );
                    });
                });
            }
        });
    }
};

module.exports = artRenderFun;
