# web-starter-kit
一个基于require+gulp+less的前后端分离的脚手架工具

# 目录结构

- bin
  - render.js——(在gulpfile文件中使用到)解析layout中的模板html，将完整的html产出到src/html中
- dist——**产出目录（在项目下运行npm run build就可以将src下相关资源产出到该目录）**
- src——**开发目录（只需在该目录下开发即可）**
  - conf——配置文件目录
  - css——由less文件生成的的css文件
  - data——mock数据文件夹
  - html——由layout中的html文件解析出来的最终html文件
  - images——图片文件夹
  - js——js文件夹（**js相关在此文件夹中开发**）
  - layout——html的源文件夹（**html在该文件夹中开发**）
  - less——less文件夹（**样式相关的在该文件夹中开发**）
  - vendor——第三方库
  - widget——公用的html模板



# 使用到的技术

- [require](http://requirejs.org/docs/start.html)：实现模块化开发
- [mock](http://mockjs.com/)：实现本地模拟服务器端返回数据
- [browsersync](http://www.browsersync.cn/)：启动本地浏览页面，并实现当源码更改时页面实时刷新
- [art-template](https://github.com/aui/art-template)：使用到了html模块化封装，还有js模板
- [gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer)：使用gulp-autoprefixer根据设置浏览器版本自动处理浏览器前缀
- 图片压缩，less转css，css和js压缩，css生成sourcemap



# 如何使用

1. 下载项目

   ```
   $ git clone git@github.com:HuYuee/web-starter-kit.git
   ```

2. 安装依赖

   ```
   $ cd web-starter-kit && npm install
   ```

3. 启动页面，访问[http://localhost:3333/src/html/index.html](http://localhost:3333/src/html/index.html)

   ```
   $ npm run start
   ```

4. 产出最终工程

   ```
   $ npm run build
   ```




# 如何新建页面

1. 新建html

   在`src/layout`文件夹中新建`page1.html`,在代码可以引入部门公用html模板，也可以写自己定制的代码。**这里需要明确的说一点：在html中的底部会加入require引入，这里必须要写入页面在require中对应的配置名称，比如下面的page1**。如果只是测试可以拷入以下代码：

   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <!-- ws: 引入公共样式 -->
       {{{include '../widget/public_style'}}}
       <!-- we: 引入公共样式 -->
   </head>
   <body style="visibility:hidden;">
       <h1>这里是page1的内容</h1>
       <a href="index.html">点击回首页</a>
       <!--ws: 公共Script -->
       {{{include '../widget/public_script'}}}
       <!--we: 公共Script -->
       <script>
       //通过require的方式来引入需要的js
         require( ['page1'], function() {
         });
       </script>
   </body>
   </html>
   ```

2. 新建样式文件

   在`src/less/page`文件夹中新建`page1.less`，在代码中可以引入公共的less模板，也可以自己写。如果是测试可以拷入以下代码：

   ```less
   // 引入基本样式
   @import '../widget/common.less';

       h1 {
           font-size: 25px;
       }
   ```

3. 新建js文件

   在`src/js`文件夹下新建`page1`文件夹，然后在`page1`文件夹下新建文件`page1.js`。里面可以通过require语法引入其他js。可以拷入以下代码进行测试：

   ```js
   define(["jquery", "data", "template"], function($, d, template) {
       $("body").css("visibility", "visible");

   });
   ```

4. 配置require

   在`src/conf/require.config.js`中配置新加入的js和css，如下图所示：
   
   ![image.png](http://upload-images.jianshu.io/upload_images/5099107-b044576b1680ebfc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
   

5. 当然如果你再别的方面还需要进行增加或者修改可以到相应的目录下去修改，比如图片在images中修改，第三方插件在vendor中加入。

6. 最后你可以访问[http://localhost:3334/src/html/page1.html](http://localhost:3334/src/html/page1.html)
