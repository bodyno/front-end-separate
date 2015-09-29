# express-velocity-front-end

##基于express和grunt的前后端分离框架:+1::+1::+1:

模版基于java-velocity模板引擎

express为路由提供服务

项目中src为原代码文件夹，dist为输出文件夹

开发使用src，线上使用dist，并且支持一键cdn部署，加速你的项目

项目启动时，修改任何服务器代码，可以实现自动重启--基于nodemon

支持sass(已从less迁移到sass)，sass精灵小图片

基于grunt md5 打包合并

新增html已经压缩成一行

###怎么使用:

首先 clone 代码

然后启动命令行工具

依次输入下列指命

```bash
npm install
bower-installer
grunt copy:vendor
grunt
```

推荐一个这个bower工具[bower-installer](https://github.com/blittle/bower-installer)非常好用，只下载依赖的文件，其余的都不会存在项目中

浏览器输入localhost,你就可以看到漂亮的页面了

打包命令 grunt build  会生成dist文件夹，里面可以看到js、css都加了md5缀

###如果大家喜欢的话，请点一下star并且follow一下本人，这是对本人最大的支持

###我会继续完善这个项目的，并一直维护下去，如果有任何问题，欢迎在issues里面提出:wink:

###感谢大家支持!

###——Nobody:point_up::point_up::point_up: