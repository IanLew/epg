# Epg API
Because javascript is an open language, many of the methods in the program can be accessed. And I didn't privatize them, so, if you know what they do and can use them, congratulations. However, I am not prepared to introduce it here. I will only elaborate on what I think is important. Now, let's go.<br>
When you use `epg`, first identify the focus tag on the page and then initialize the `epg`.
```javascript
epg.init({
	// config code.
});
```

## Initialize configuration
The following is the default value for the configuration item.
```javascript
var defaults = {
	controller: {},
	cursor: {
		sign: '.link',
		first: doc.querySelector('.link'),
		rim: '.pseudo',
		mode: 'outer',
		border: '#ffde00 solid 2px',
		shadow: '0 0 8px 1px #000',
		effect: null
	}
};
```
Configuration item interpretation:<br>
`controller`: remote control object, you can write the operation callback function inside.<br>
These are the callback functions: `left`, `right`, `up`, `down`, `enter` and `back`. `left`/`right`/`up`/`down` are the focus movement direction function. If you don't need any action while the focus is moving, you can't configure it. Instead, the built-in operation function, which is the internal operation function of the `cursor` object. Even if there is any change that must be reset, you will lose the default operation and you will be solely responsible for all operations. For example, the data is loaded synchronous or the focus jumps to the specified location. That is, if the initialization is done externally, the callback must be used for the corresponding purpose. <br>
`enter` and `back` are link jump and page return function. If there is no operation, you can do without configuration.<br>
`cursor`: focus object's configuration object, relationship to focus execution.<br>
`sign`, a class name which is the tag of the focus, if you do not set the focus mark must be the default.<br>
`first`, the first focus which you want to set, if not specified, the default value will be executed. Because the first focus needs to be found, it must be initialized in the presence of the focus, otherwise it may not be expected.<br>
`rim`, a focus class name, the box style, the external style.<br>
`mode`, `outer` is default, it means external style, if the value is it, `rim` class must be define. Another value `inline`, it means inline style, if the value is it, config value `border` and `shadow` are valid.<br>
`border` and `shadow`, border style and shades style.<br>
`effect`, data type is number, has two effects which `scale` and `twinkle`. If the value is between 1 and 5, the focus area will perform magnification. If the value is between 500 and 2000, the focus area will perform the flicker effect. 

## Cousor Object
As mentioned above, it is a focus object and can be moved to the next appropriate focus position according to the direction of operation. The functions `left`/`right`/`up`/`down`, automatically moves to the next appropriate focus, depending on the initial focus, if there is no substitute function initialized. If the new function is initialized, it can still be invoked internally for situations where there is no new focus.<br>
So call:
```javascript
epg.cursor.left();  // normal call.
epg.cursor.right(document.querySelector('.video .link'));  // new focus.
```
The second invocation, the argument must be the `only DOM object`.<br>
Other major functions:
```javascript
epg.cursor.parent(first, second);  // return the target parent element exists.
```
`first` is the parent element, must. `second` is find the child element of the parent element, optional. If `second` is not exists, the default value is the current focus. These two parameters are allowed to be `string` or `only DOM object`.
```javascript
epg.cursor.index(parent, target);  // return the target element is indexed by the parent element.
```
`parent` is the parent element, must. `target` is child element under the parent element, optional. If `target` is not exists, the default value is the current focus. These two parameters are allowed to be `string` or `only DOM object`.
```javascript
epg.cursor.next(dir);  // return next focus.
```
`dir`, specifies the direction of the next focus.<br>
Functions that can still be called externally:
```javascript
// Internal call:
epg.cursor.move(parameter);  // The focus moves(left/right/up/down) the underlying call function.
epg.cursor.setRim();  // The focus box sets the function.
```
You can get current cusor by `epg.cursor.pointer`.

## Swiper Object
A special effects utility class, include `slide` and `list movement` two kinds of special effects, The following is the default value for the configuration item.
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
Configuration item interpretation:<br>
`mode`, effecttype, `list` or `slide`. If not configured, the program automatically identifies the type. Of course, there will be an identification failure, and the default will not be any operation. For example, the width/height you set is not the same as the program expected. So I strongly recommend configuring it.<br>
`container`, outermost layer, class name. `wrapper`, list package, class name. `pagination`, paging indicator, only type is valid for `slide`., so `list` don't need to configure. `wrapper`, the pager wrap layer, class name. `tagName`, the tag used by the paging indicator. `normal`, normal pager, class name. `active`, current page indicator, class name. `prevButton` and `nextButton`, the previous and next page indicator buttons, class name. These configuration items must be used in accordance with the corresponding parameters if they are not configured.<br>
`direction`, list/slide orientation, `horizontal` or `vertical`.<br>
`autoPlay`, autoplay delay, If the value is 0, it doesn't play automatically. Just like `pagination`, it only works for the `slide` type.<br>
`distance`, specify a width/height as the moving distance, it only works for the `list` type.<br>
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
You can control `swiper` movement direction, the functions `left`/`right`/`up`/`down`, So call:
```javascript
epg.swiper.left(); 
epg.swiper.up();
```
Functions that can still be called externally:
```javascript
// Internal call: 
epg.swiper.move(dir, auto);  // The focus moves(left/right/up/down) the underlying call function.
epg.swiper.contrls();  // setting the previous and next page indicator buttons.
epg.swiper.autoPlay();  // slide autoplay.
```