# web-starter-kit
一个基于require+gulp的前后端分离的脚手架工具

# 目录结构

- bin
  - render.js——(在gulpfile文件中使用到)解析layout中的模板html，将完整的html产出到src/html中
- dist——生成出来的最终工程结构
- src
  - conf——配置文件目录
  - css——由less文件产出的css文件
  - data——mock数据文件夹
  - html——由layout中的html文件解析出来的最终html文件
  - images——图片文件夹
  - js——js文件夹
  - layout——html的源文件夹
  - less——less文件夹
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

3. 启动页面

   ```
   $ npm run start
   ```

4. 产出最终工程

   ```
   $ npm run build
   ```

   ​
