var fs = require("fs");
var fse = require("fs-extra");
var path = require("path");
var template = require("art-template");

//解析layout中的模板html，将完整的html产出到src/html中
var renderFun = function() {
    /**
     * 模板引擎设置项：
     * cache: 关闭模板引擎渲染缓存
     * openTag,closeTag: 修改开关标签，支持react组件'{{}}'
     */
    template.config("cache", false);
    template.config("openTag", "{{{");
    template.config("closeTag", "}}}");

    var renderData = {};
    var env = process.cwd();

    // 读取文件目录
    var middlePath = "src/layout/";
    var outPath = "src/html/";
    var rootDir = path.join(env, middlePath);
    if (fs.existsSync(rootDir)) {
        var pageList = fs.readdirSync(rootDir);

        //遍历layout文件夹
        pageList.forEach(function(page) {
            var isHtml = /html$/.test(page);
            if (isHtml) {
                var data = {};
                var htmlPath = path.join(rootDir, page).replace(/\.html$/,'');
                //加载对应html模板
                var htmlRender = template(htmlPath, data);
                var outFilePath = path.join(env, outPath, page);
                //将生成的htmlRender写入/src/html文件夹中的相应的html中
                fse.outputFile(outFilePath, htmlRender, "utf-8", function() {
                    console.log(outFilePath, "渲染完毕");
                });
            }
        });
    }
};

module.exports = renderFun;

// 文件目录渲染
// 文件输出置顶目录
