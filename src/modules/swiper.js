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
			direction: 'horizontal',
			autoPlay: 3000,
			distance: 0
		};

		var config = core.extend({}, defaults, options);

		this.container = doc.querySelector(config.container);
		this.wrapper = this.container.querySelector(config.wrapper);
		this.prevButton = this.container.querySelector(config.prevButton);
		this.nextButton = this.container.querySelector(config.nextButton);
		this.config = {};

		if (config.type === 'none') {
			if (this.items[0].offsetWidth == this.container.offsetWidth) {
				config.type = 'slide';
			} else if (this.wrapper.offsetWidth > this.container.offsetWidth || this.items[0].offsetWidth < this.container.offsetWidth) {
				config.type = 'list';
			}
		}
		if (config.type === 'list') {
			for (var j in config) {
				if (!/(autoPlay|speed|loop|pagination)/ig.test(j)) {
					this.config[j] = config[j];
				}
			}

			if (this.config.direction === 'horizontal') {
				this.pageNum = Math.ceil(this.wrapper.offsetWidth / this.container.offsetWidth);
				this.scrollWidth = (this.pageNum - 1) * this.container.offsetWidth;
				this.distance = config.distance ? config.distance : this.container.offsetWidth;
			} else if (this.config.direction === 'vertical') {
				this.pageNum = Math.ceil(this.wrapper.offsetHeight / this.container.offsetHeight);
				this.scrollWidth = (this.pageNum - 1) * this.container.offsetHeight;
				this.distance = config.distance ? config.distance : this.container.offsetHeight;
			}
			this.currentPage = 1;
		} else if (config.type === 'slide') {
			for (var k in config) {
				if (!/(scrollbar|distance)/ig.test(k)) {
					this.config[k] = config[k];
				}
			}

			this.pagination = this.container.querySelector(config.pagination.wrapper);
			this.items = this.container.querySelectorAll(config.wrapper + ' > *');
			this.itemNums = this.items.length;

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
				this.currentIdx = 0;
			}

			if (this.autoPlay) {
				var _this = this;
				if (this.direction === 'horizontal') {
					setInterval(_this.left, _this.autoPlay);
				} else if (this.config.direction === 'vertical') {
					setInterval(_this.up, _this.autoPlay);
				}
			}
		}

		if (this.prevButton || this.nextButton) {
			this.contrls();
		}
	}

	swiper.prototype = {
		left: function() {
			this.move('left');
		},
		right: function() {
			this.move('right');
		},
		up: function() {
			this.move('up');
		},
		down: function() {
			this.move('down');
		},
		move: function(dir) {
			if (this.config.type === 'slide') {
				this.items[this.currentIdx].style.zIndex = 1;
				this.allPagination[this.currentIdx].classList.remove(this.config.pagination.active);
				if (this.config.direction === 'horizontal') {
					if (dir === 'left') {
						if (this.currentIdx > 0) {
							--this.currentIdx;
						} else {
							this.currentIdx = this.itemNums - 1;
						}
					} else if (dir === 'right') {
						this.currentIdx = (this.currentIdx + 1) % this.itemNums;

					}
				} else if (this.config.direction === 'vertical') {
					if (dir === 'up') {
						this.currentIdx = (this.currentIdx + 1) % this.itemNums;
					} else if (dir === 'down') {
						if (this.currentIdx > 0) {
							--this.currentIdx;
						} else {
							this.currentIdx = this.itemNums - 1;
						}
					}
				}
				this.items[this.currentIdx].style.zIndex = 10;
				this.allPagination[this.currentIdx].classList.add(this.config.pagination.active);
			} else if (this.config.type === 'list') {
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
						if (this.currentPage < this.pageNum) {
							this.wrapper.style.top = this.wrapper.offsetTop - this.distance + 'px';
							++this.currentPage;
						}
					} else if (dir === 'down') {
						if (this.currentPage > 1) {
							this.wrapper.style.top = this.wrapper.offsetTop + this.distance + 'px';
							--this.currentPage;
						}
					}
				}
			}
			if (this.prevButton || this.nextButton) {
				this.contrls();
			}
		},
		// Scroll button.
		contrls: function() {
			if (this.type === 'slide') {
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