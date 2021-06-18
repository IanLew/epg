# Epg
**Epg已停止维护**<br>

**它是我多年前做机顶盒开发时编写，最初基于jQuery，后来觉得太笨重，于是改用原生JavaScript开源。开源的时候故意写了中式英文文档，意思是不太推荐直接使用，毕竟没有经过机顶盒测试。开源后，偶尔会收到开发者的留言，我给不了太大的建议，已经过去很多年不太了解现在机顶盒的兼容，这个插件顶多起到引导思路的作用。由于我还不清楚怎样设置代码处于不维护状态，于是将文档改为中文，并留下这段话**<br>

Epg是为电信机顶盒页面开发的javascript插件，主要为了解决交互复杂情况下焦点移动的问题。如果您的页面非常简单，建议手动设置焦点，不建议使用插件。 例如，您的页面只有很少的焦点，只有一些图片。 当然，我建议设计简单，易于交互。 

## 相关介绍
从[build](https://github.com/IanLew/epg/tree/master/build)目录中将文件[epg.min.js](https://github.com/IanLew/epg/blob/master/build/epg.min.js)拷贝到您的项目中。<br>

在页面上引入:
```javascript
<script type="text/javascript" src="epg.min.js"></script>
```

现在您就可以使用 `epg`了，首先进行初始化:
```javascript
epg.init({
	// 配置项
});
```

接下来，通过设置一个class标记需要焦点的位置（机顶盒默认焦点是`<a>`标签）。 <br>

开什么国际玩笑？机顶盒已经有焦点样式了，为什么不适用它？这就像HTML标签，我们通常都会reset。机顶盒的焦点也是一样，每个厂商对焦点框的样式和外框计算规则是不一致的，同时电信没有对此有规范，即使有可能也是内部资料（不外传）。HTML的外框无非border、outline、box-shadow，它们在有些机顶盒上是生效的。开发者应该都遇到过，有些机顶盒的焦点框可以沿着文字外框曲折变化，这显然不是HTML的样式所能做到。 <br>

所以要做到焦点统一，我们只能自己想办法，这就是为什么Epg出现。

> 记住，如果电信公司的老板不是您的朋友，请不要试图用`<a>`标签作为焦点。

那么问题又来了，没有`<a>`标签，如何配置链接，如何实现跳转? 当需要时，您可以使用自定义属性将链接放在标识为焦点的标签上，例如`data-*`。 有了链接，事情变得更容易，`document.location.herf`来完成跳转工作。<br>

如果想使用一些特殊效果，Epg提供了`swiper`进行支持，它有两种效果：幻灯片效果和列表移动效果。
```javascript
new epg.swiper({
	// 配置项
});
```

> 须要记住的是，它必须在加载文件之后使用。您可以在`window.onload`使用，也可以在HTML最后写。 如果使用同步加载，初始化应该在同步完成函数中。  

[Epg参考文档](https://github.com/IanLew/epg/blob/master/API.md)。

[相关demo](https://github.com/IanLew/epg/tree/master/demo)，[sample](https://github.com/IanLew/epg/tree/master/demo/sample)是对`swiper`的使用，[project](https://github.com/IanLew/epg/tree/master/demo/project)是Epg在项目中的使用。

## 修改源码
这仅仅只是我以前项目的一个结果，希望它可以帮到您。个人拥有绝对版权，不是公司性质。如果您认为我的代码不好，或者您想添加自己的代码，您可以不负责地修改。<br>

首先，您需要克隆我的源代码，虽然它看起来像垃圾，但我喜欢它，因为它曾给我解决过麻烦。<br>

然后在Epg的目录下运行安装依赖包：
```bash
npm install
```

编译生产代码，文件将出现在`build`中：
```bash
grunt
```	
