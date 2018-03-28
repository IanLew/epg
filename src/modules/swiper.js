define(['modules/core'], function(core) {
	function swiper(options) {
		var defaults = {
			type: 'none',
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
			scrollbar: {
				wrapper: '.swiper-scrollbar',
				thumb: '.swiper-scrollbar-thumb'
			},
			direction: 'horizontal',
			autoPlay: 0,
			speed: 400,
			loop: false,
		};

		var config = core.extend({}, defaults, options);

		this.container = doc.querySelector(config.container);
		this.wrapper = this.container.querySelector(config.wrapper);
		this.items = this.container.querySelectorAll(config.wrapper + ' > *');
		this.itemNums = this.items.length;
		this.pagination = this.container.querySelector(config.pagination.wrapper);
		this.prevButton = this.container.querySelector(config.prevButton);
		this.nextButton = this.container.querySelector(config.nextButton);
		this.scrollbar = this.container.querySelector(config.scrollbar.wrapper);
		this.scrollbarThumb = this.container.querySelector(config.scrollbar.wrapper);

		this.currentIdx = 0;

		if (config.type === 'none') {
			if (this.items[0].offsetWidth == this.container.offsetWidth) {
				config.type = 'slide';
			} else if (this.wrapper.offsetWidth > this.container.offsetWidth || this.items[0].offsetWidth < this.container.offsetWidth) {
				config.type = 'list';
			}
		}
		if (config.type === 'list') {
			for (var j in config) {
				if (!/autoPlay|speed|loop|pagination/ig.test(j)) {
					this.config[j] = config[j];
				}
			}
		} else if (config.type === 'slide') {
			for (var k in config) {
				if (!/scrollbar/ig.test(k)) {
					this.config[k] = config[k];
				}
			}
		}

		if (this.itemNums && this.pagination) {
			var text = '';
			for (var i = 0; i < this.itemNums; i++) {
				if (i === this.currentIdx) {
					text += '<' + this.config.pagination.tagName + ' class="' + this.config.pagination.normal + ' ' + this.config.pagination.active + '"></' + this.config.pagination.tagName + '>';
				} else {
					text += '<' + this.config.pagination.tagName + ' class="' + this.config.pagination.normal + '"></' + this.config.pagination.tagName + '>';
				}
			}
			this.pagination.innerHTML = text;
			this.allPagination = this.pagination.querySelectorAll(this.config.pagination.normal);
			this.currPagination = this.pagination.querySelector(this.config.pagination.active);
		}

		if (this.prevButton || this.nextButton) {
			this.contrls();
		}

		if (this.autoPlay) {

		}
	}

	swiper.prototype = {
		left: function() {

		},
		right: function() {

		},
		up: function() {

		},
		down: function() {

		},
		move: function(dir) {
			if (this.type === 'slide') {

			} else if (this.type === 'list') {
				
				if (this.direction === 'horizontal') {

				} else if (this.config.direction === 'vertical') {

				}
			}
		},
		contrls: function() {
			if (this.type === 'slide') {
				if (this.loop) {
					this.prevButton.style.display = 'block';
					this.nextButton.style.display = 'block';
				} else {
					if (this.itemNums > 1) {
						if (this.currentIdx > 0 && this.currentIdx < this.itemNums - 1) {
							this.prevButton.style.display = 'block';
							this.nextButton.style.display = 'block';
						} else if (this.currentIdx === 0) {
							this.prevButton.style.display = 'none';
							this.nextButton.style.display = 'block';
						} else if (this.currentIdx === this.itemNums - 1) {
							this.prevButton.style.display = 'block';
							this.nextButton.style.display = 'none';
						}
					} else {
						this.prevButton.style.display = 'none';
						this.nextButton.style.display = 'none';
					}
				}
			} else if (this.type === 'list') {
				if (this.scrollWidth > 0) {
					var offset;
					if (this.config.direction === 'horizontal') {
						offset = this.wrapper.offsetLeft;
					} else if (this.config.direction === 'vertical') {
						offset = this.wrapper.offsetTop;
					}
					if (offset < 0 && Math.abs(offset) < this.scrollWidth) {
						this.prevButton.style.display = 'block';
						this.nextButton.style.display = 'block';
					} else if (offset === 0) {
						this.prevButton.style.display = 'none';
						this.nextButton.style.display = 'block';
					} else if (Math.abs(offset) >= this.scrollWidth) {
						this.prevButton.style.display = 'block';
						this.nextButton.style.display = 'none';
					}
				} else {
					this.prevButton.style.display = 'none';
					this.nextButton.style.display = 'none';
				}
			} else {
				this.prevButton.style.display = 'none';
				this.nextButton.style.display = 'none';
			}
		}
	};

	return swiper;
});