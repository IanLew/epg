# Epg
Epg is a javascript plug-in developed for China telecom's set-top box page.
This plug-in builds on the more complex interaction of the page. If your page is very simple, it is recommended to manually set the focus and not recommend using the plugin. For example, your page has very few focal points, just a few images. Of course, I would suggest that the design be simple, simple and easy to interact with.
If not, I'll tell you why `epg` exists.

## Getting Started
Clone from this page, copy the `epg.js /epg.min.js` file from the `build/` directory to your project.
Reference on the page:
```javascript
<script type="text/javascript" src="js/epg.js"></script>
```
Now you can use `epg`, first, initialize it:
```javascript
epg.init({
	// config code.
});
```
Next, set a place where the style tag needs focus, and the location of the default link style tag is the focus. What? Set the tag for focus? Are you kidding me? A lot of people will ask why? The set-top box browser already has a focus style, why not use it? Seriously, I'm not crazy, it's telecom mad. Each type of set-top box focus style is inconsistent, and you can't change the way it looks. There is no document telling us how to change the appearance of it, the telecommunication can not give the document, or the internal reference does not pass. So we can only solve this problem by ourselves, and this is the answer.
>Remember it, if telecom's boss is not your friend, please don't try to use `a` tag as focus.
Then the question comes again, without `a` tag, how to configure the link, how to achieve the jump? You can use a custom attribute to put a link into the focus tag, such as `data-*`, when needed. With links, things get easier, `document.location.herf` can instead `a` tag.
If you want to use some special effects, the plug-in provides a tool called swiper, which has two modes of expression: slide effects and list movement effects.
```javascript
new epg.swiper({
	// config code.
});
```
The configuration item reference API file `API.md`.
>It is worth remembering that it must be used after the document is loaded. You can use it in function `window.onload`, or you can write it in the end. If you use synchronous loading, the initialization should be in the synchronous completion function.
You can see examples in the `demo/` directory, the pages under the `sample/` directory are a few simple answers, the pages under the static directory are used under the project.

## Build
This is the result of the project I have been working on for several months, and I hope it will be useful to you. Due to personal open source, not the nature of the company, the code is a reversion of personal arrangement after work. If you think my code is bad, or if you want to add your own code, you can rewrite the code. 
First, you need to `clone` my source code, it looks like crap, but I like crap.
Then install the dependency package, in repo's root:
		$ npm install
And build development environment:
		$ grunt
Production version will available in `build/` directory.