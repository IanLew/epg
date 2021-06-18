# Epg API
因为JavaScript没有强力支持私有化的能力，因此程序中的内部方法也可能被访问到，所以，如果您知道它们做什么用，恭喜您可以随便。然而，我不准备在这里介绍它，除了一些关键。<br>

当你开始使用`epg`，首先确定焦点标识class，然后初始化`epg`.
```javascript
epg.init({
	// config code.
});
```

## 初始化
配置项的默认值如下所示：
```javascript
var defaults = {
	controller: {},
	cursor: {
		sign: '.link',
		first: document.querySelector('.link'),
		rim: '.pseudo',
		mode: 'outer',
		border: '#ffde00 solid 2px',
		shadow: '0 0 8px 1px #000',
		effect: null
	}
};
```

配置项说明：<br>
`controller`：远程控制对象，可以在里面写操作回调函数。操作回调函数有`left`，`right`，`up`，`down`，`enter`和`back`。配置项如下：<br>
`left`/`right`/`up`/`down`：焦点移动操作回调。如果在焦点移动时不需要任何特殊操作，则无需配置它。如果他们没有被自定义，则由内部操作函数负责计算焦点。一旦配置您将失去默认操作，您将全权负责所有焦点移动。这个配置有用的，例如，焦点跳转到指定的位置。Epg提供了获取下一个焦点api，用于执行默认的移动规则<br>
`enter`/`back`：链接跳转/页面返回回调。如果没有操作，可以不配置。<br>

`cursor`: 焦点的相关配置，配置项如下：<br>
`sign`：如果没有设置焦点标记，则作为焦点标记的类名必须为默认值.link。<br>
`first`：您想要设置的第一个焦点，如果没有指定，将执行默认值。因为需要找到第一个焦点，所以必须在有焦点的情况下初始化它，否则可能无法达到预期。<br>
`rim`：焦点类名、框样式、外部样式。<br>
`mode`：`outer`是默认值，它意味着外部样式，须配置`rim`。另一个值`inline`表示内联样式，须配置`border`和`shadow`。<br>
`border`/`shadow`：边框风格和阴影风格。<br>
`effect`：数据类型是number，有两种效果，`scale`和`twinkle`。如果该值在1到5之间，则对聚焦区域进行放大。当该值在500~2000之间时，焦点区域会产生闪烁效果。

## Cousor对象
Cousor对象，默认根据操作方向移动到下一个合适的聚焦位置。如果没有初始化的回调函数，`Cousor.left`/`Cousor.right`/`Cousor.up`/`Cousor.down`会根据初始化的焦点自动移动到下一个适当的焦点。如果已经初始化回调函数，那么在没有新焦点的情况下仍然可以在内部调用它，调用方法如下：<br>
```javascript
epg.cursor.left();  // 正常调用
epg.cursor.right(document.querySelector('.video .link'));  // 传入焦点DOM
```
第二个调用方法，参数必须是`唯一的DOM对象`。<br>

其他主要功能:
```javascript
epg.cursor.parent(first, second);  // 返回存在的目标父元素。
```
`first`是父元素，必须。`second`是查找父元素的子元素，可选。如果`second`不存在，则默认值为当前焦点。这两个参数可以是`string`或`唯一DOM对象`。

```javascript
epg.cursor.index(parent, target);  // 返回由父元素索引的目标元素。
```
`parent`是父元素，必须。`target`是父元素下的子元素，可选。如果`target`不存在，则默认值为当前焦点。这两个参数可以是`string`或`唯一DOM对象`。

```javascript
epg.cursor.next(dir);  // 返回下一个焦点。
```
`dir`指定下一个焦点的方向。<br>

仍然可以从外部调用的函数:  
```javascript
// 内部方法
epg.cursor.move(parameter);  // 焦点移动(left/right/up/down)底层调用函数。
epg.cursor.setRim();  // 焦点框设置功能。
```
你可以通过`epg.cursor.pointer`获取当前焦点。

## Swiper对象
Swiper对象，包括`幻灯片`和`列表移动`两种特效，下面是配置项的默认值：
```javascript
var defaults = {
	mode: 'none',
	container: '.swiper-container',
	wrapper: '.swiper-wrapper',
	pagination: {
		wrapper: '.swiper-pagination',
		tagName: 'span',
		normal: '.swiper-pagination-normal',
		active: '.swiper-pagination-active'
	},
	prevButton: '.swiper-button-prev',
	nextButton: '.swiper-button-next',
	direction: 'horizontal',
	autoPlay: 5000,
	distance: 0
};
```

配置项说明：<br>
`mode`：效果类型，`list`/`slide`。如果没有配置，程序将自动识别类型。 当然，会出现标识失败，并且默认不会有任何操作。 例如，您设置的宽度/高度与程序期望的不一样。 所以我强烈建议配置它。  <br>
`container`：最外层，类名。`wrapper`，列表包裹层，类名。<br>
`pagination`：分页配置，只对`slide`类型有效，因此`list`类型不需要配置。`wrapper`，分页包装层，类名。`tagName`，分页指示器所使用的标记。`normal`，非激活状态，类名。`active`，激活状态，类名。`prevButton`/`nextButton`，上一页和下一页指示按钮，类名。 如果没有配置这些配置项，则需要根据对应的参数进行页面配置。<br>
`direction`：列表/滑动方向，`horizontal` or `vertical`.<br>
`autoPlay`：自动播放延迟，如果该值为0，则不会自动播放。和`pagination`一样，只对`slide`类型有效。<br>
`distance`：指定移动距离，只对`list`类型有效。<br>

```html
<!-- swiper-list -->
<div class="swiper-container">
	<div class="swiper-button-prev">←</div>
	<div class="swiper-wrapper">
		<div class="swiper-slide link">1</div>
		<div class="swiper-slide link">2</div>
		<div class="swiper-slide link">3</div>
	</div>
	<div class="swiper-button-next">→</div>
</div>

<!-- swiper-slide -->
<div class="swiper-container">
	<div class="swiper-button-prev">←</div>
	<div class="swiper-wrapper link">
		<div class="swiper-slide">1</div>
		<div class="swiper-slide">2</div>
		<div class="swiper-slide">3</div>
	</div>
	<div class="swiper-button-next">→</div>
	<div class="swiper-pagination"></div>
</div>
```

你可以控制`swiper`移动方向：`Swiper.left`/`Swiper.right`/`Swiper.up`/`Swiper.down`：
```javascript
epg.swiper.left(); 
epg.swiper.up();
```

仍然可以从外部调用的函数:  
```javascript
// 内部方法 
epg.swiper.move(dir, auto);  // 焦点移动(left/right/up/down)底层调用函数。
epg.swiper.contrls();  // 设置上一页和下一页的指标按钮。
epg.swiper.autoPlay();  // 自动播放
```