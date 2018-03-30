define(['modules/core'], function(core) {
	function swiper(options) {
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

		var config = core.extend(true, defaults, options);

		this.container = doc.querySelector(config.container);
		this.wrapper = this.container.querySelector(config.wrapper);
		this.prevButton = this.container.querySelector(config.prevButton);
		this.nextButton = this.container.querySelector(config.nextButton);
		this.items = this.container.querySelectorAll(config.wrapper + ' > *');
		this.itemNums = this.items.length;
		this.config = {};

		if (config.mode === 'none' && this.itemNums) {
			if (this.items[0].offsetWidth === this.wrapper.parentNode.offsetWidth) {
				config.mode = 'slide';
			} else if (this.wrapper.offsetWidth > this.wrapper.parentNode.offsetWidth || this.items[0].offsetWidth < this.wrapper.parentNode.offsetWidth) {
				config.mode = 'list';
			}
		}
		if (config.mode === 'list') {
			for (var j in config) {
				if (!/autoPlay|speed|loop|pagination/ig.test(j)) {
					this.config[j] = config[j];
				}
			}

			if (this.config.direction === 'horizontal') {
				this.pageNum = Math.ceil(this.wrapper.offsetWidth / this.wrapper.parentNode.offsetWidth);
				this.scrollWidth = this.wrapper.offsetWidth - this.wrapper.parentNode.offsetWidth;
				this.distance = config.distance ? config.distance : this.wrapper.parentNode.offsetWidth;
			} else if (this.config.direction === 'vertical') {
				this.pageNum = Math.ceil(this.wrapper.offsetHeight / this.wrapper.parentNode.offsetHeight);
				this.scrollWidth = this.wrapper.offsetHeight - this.wrapper.parentNode.offsetHeight;
				this.distance = config.distance ? config.distance : this.wrapper.parentNode.offsetHeight;
			}
			this.currentPage = 1;
		} else if (config.mode === 'slide') {
			for (var k in config) {
				if (!/scrollbar|distance/ig.test(k)) {
					this.config[k] = config[k];
				}
			}

			this.pagination = this.container.querySelector(this.config.pagination.wrapper);
			this.currentIdx = 0;

			if (this.itemNums) {
				var text = '',
					normal = this.config.pagination.normal.replace(/^\./g, ''),
					active = this.config.pagination.active.replace(/^\./g, '');
				for (var i = 0; i < this.itemNums; i++) {
					if (i === this.currentIdx) {
						this.pagination && (text += '<' + this.config.pagination.tagName + ' class="' + normal + ' ' + active + '"></' + this.config.pagination.tagName + '>');
						this.items[i].style.zIndex = 2;
					} else {
						this.pagination && (text += '<' + this.config.pagination.tagName + ' class="' + normal + '"></' + this.config.pagination.tagName + '>');
						this.items[i].style.zIndex = 1;
					}
				}

				if (this.pagination) {
					this.pagination.innerHTML = text;
					this.allPagination = this.pagination.querySelectorAll(this.config.pagination.normal);
					this.currPagination = this.pagination.querySelector(this.config.pagination.active);
				}
			}

			this.config.autoPlay && this.autoPlay();
		}

		(this.prevButton || this.nextButton) && this.contrls();
	}

	swiper.prototype = {
		left: function() {
			this.move('left', arguments[0]);
		},
		right: function() {
			this.move('right', arguments[0]);
		},
		up: function() {
			this.move('up', arguments[0]);
		},
		down: function() {
			this.move('down', arguments[0]);
		},
		move: function(dir, auto) {
			if (this.config.mode === 'slide') {
				if (!auto) {
					var _this = this;
					this.delayTimer && clearTimeout(this.delayTimer);
					this.slideTimer && clearInterval(this.slideTimer);
					this.delayTimer = null, this.slideTimer = null;
					this.delayTimer = setTimeout(function() {
						_this.autoPlay();
					}, _this.config.autoPlay);
				}

				this.items[this.currentIdx].style.zIndex = 1;
				this.allPagination && this.allPagination[this.currentIdx].classList.remove(this.config.pagination.active.replace(/^\./g, ''));
				if (this.config.direction === 'horizontal') {
					if (dir === 'left') {
						this.currentIdx = this.currentIdx > 0 ? this.currentIdx - 1 : this.itemNums - 1;
					} else if (dir === 'right') {
						this.currentIdx = (this.currentIdx + 1) % this.itemNums;
					}
				} else if (this.config.direction === 'vertical') {
					if (dir === 'up') {
						this.currentIdx = this.currentIdx > 0 ? this.currentIdx - 1 : this.itemNums - 1;
					} else if (dir === 'down') {
						this.currentIdx = (this.currentIdx + 1) % this.itemNums;
					}
				}
				this.items[this.currentIdx].style.zIndex = 2;
				this.allPagination && this.allPagination[this.currentIdx].classList.add(this.config.pagination.active.replace(/^\./g, ''));
			} else if (this.config.mode === 'list') {
				if (this.config.direction === 'horizontal') {
					if (dir === 'left') {
						if (this.currentPage > 1) {
							this.wrapper.style.left = this.wrapper.offsetLeft + this.distance + 'px';
							--this.currentPage;
						}
					} else if (dir === 'right') {
						if (this.currentPage < this.pageNum) {
							this.wrapper.style.left = this.wrapper.offsetLeft - this.distance + 'px';
							++this.currentPage;
						}
					}
				} else if (this.config.direction === 'vertical') {
					if (dir === 'up') {
						if (this.currentPage > 1) {
							this.wrapper.style.top = this.wrapper.offsetTop + this.distance + 'px';
							--this.currentPage;
						}
					} else if (dir === 'down') {
						if (this.currentPage < this.pageNum) {
							this.wrapper.style.top = this.wrapper.offsetTop - this.distance + 'px';
							++this.currentPage;
						}
					}
				}
			}
			(this.prevButton || this.nextButton) && this.contrls();
		},
		// Scroll button.
		contrls: function() {
			if (this.config.mode === 'slide') {
				if (this.config.autoPlay) {
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
			} else if (this.config.mode === 'list') {
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
		},
		// Slide mode autoplay.
		autoPlay: function() {
			var _this = this;
			if (this.slideTimer) {
				if (this.config.direction === 'horizontal') {
					this.slideTimer = setInterval(function() {
						_this.right(true);
					}, _this.config.autoPlay);
				} else if (this.config.direction === 'vertical') {
					this.slideTimer = setInterval(function() {
						_this.down(true);
					}, _this.config.autoPlay);
				}
			}
		}
	};

	return swiper;
});