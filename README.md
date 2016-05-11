# front-end-separate(前后端分离脚手架)

一个前后端分离的脚手架工具（自主研发）

为什么选择grunt而不是gulp

如果你也和我一样喜欢grunt这种配置的方式，那么我相信这个脚手架觉对十分适合你

所有静态资源都md5全并压缩打包,css,js,img,html

已在生产环境验证

基于express和grunt的前后端分离框架:+1::+1::+1:

模板引擎使用的是nunjucks，好处是可以实现模版继承，又不像jade一样把html标签都简化了

express提供路由服务

项目中app为原代码文件（开发用），dist为打包后的文件（用于线上）

开发使用app，线上使用dist，支持一键cdn部署，加速你的项目

项目启动时，修改任何express代码，可以实现自动重启--基于nodemon

支持sass图片精灵（自动打包精灵图片，再也不用手动去拼凑了）

基于grunt md5 打包合并

线上输出的html已经压缩成一行（让你的代码更有Geeker范）

###怎么使用:

clone 代码

启动命令行:

如果没有安装grunt，请先全局安装grunt
```bash
$ npm i grunt-cli -g
```
安装npm包(可能需要一段时间，请耐心等待)

```bash
$ npm i
```

开发模式(可以打开浏览器localhost:3001开始开发，端口配置文件里可以更改)

```bash
$ grunt
```

打包并运行打包后的代码

```bash
$ grunt build
$ npm run prod
```
打包成CDN模式(config/config.js中可配置cdn路径)

```bash
$ grunt buildCdn
```

browserSync(可以实现更改静态资源自动刷新了)

```bash
$ grunt serve
```

浏览器输入localhost:3001,你就可以看到漂亮的页面了

打包命令 grunt build  会生成dist文件夹，里面可以看到js、css都加了md5缀

tip:scss推荐用Webstorm自带的File watch功能，非常方便（安装node-sass即可）

-关于图片精灵

$ grunt sprite 执行即可得到精灵图片，如需配置请去config/grunt/sprite.js下配置更多的图片精灵

在scss中引用@import "sprite" 样式中写如:@include sprite($index_bg); 即可使用;

如果大家喜欢的话，请点一下star此项目或follow一下本人，即是对本人最大的支持

我会继续完善这个项目的，并一直维护下去，如果有任何问题，欢迎在issues里面提出:wink:

感谢大家支持!

——Nobody:point_up::point_up::point_up:
