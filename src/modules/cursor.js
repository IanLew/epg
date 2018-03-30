define(['modules/core'], function(core) {
	function cursor(options) {
		this.sign = options.sign;
		this.rim = options.rim;
		this.border = options.border;
		this.shadow = options.shadow;
		this.effect = options.effect;
		this.pointer = options.first;

		this.setRim();
	}

	cursor.prototype = {
		left: function() {
			if (arguments.length) {
				this.move(arguments[0]);
			} else {
				this.move('left');
			}
		},
		right: function() {
			if (arguments.length) {
				this.move(arguments[0]);
			} else {
				this.move('right');
			}
		},
		up: function() {
			if (arguments.length) {
				this.move(arguments[0]);
			} else {
				this.move('up');
			}
		},
		down: function() {
			if (arguments.length) {
				this.move(arguments[0]);
			} else {
				this.move('down');
			}
		},
		// Cursor move.
		move: function(target) {
			var next,
				type = core.type(target);

			if (type === 'object' && target.nodeType) {
				next = target;
			} else if (/up|down|right|left/ig.test(target)) {
				next = this.pointer && this.next(target);
			}

			if (next) {
				if (core.type(this.effect) === 'number') {
					if (this.effect > 1 && this.effect < 5) {
						this.pointer.style.cssText = '';
					} else if (this.effect > 500 && this.effect < 2000) {
						if (this.twinkleTimer) {
							clearInterval(this.twinkleTimer);
							this.twinkleTimer = null;
						}
					}
				}

				this.pointer = next;

				this.setRim();
			}
		},
		// Determines whether the target is the parent of the focus.
		parent: function(first, second) {
			if (core.type(first) === 'string') {
				first = doc.querySelector(first);
			}
			if (core.type(second) === 'string') {
				second = doc.querySelector(second);
			}

			if (core.type(first) === 'object' && first.nodeType) {
				var pnode = second ? second.parentNode : this.pointer.parentNode;

				while (true) {
					if (pnode.localName === 'body') {
						if (first.isSameNode(pnode)) {
							return true;
						} else {
							return false;
						}
					} else if (first.isSameNode(pnode)) {
						return true;
					} else {
						pnode = pnode.parentNode;
					}
				}
			}

			return false;
		},
		// Get index of the target.
		index: function(parent, target) {
			target = target || this.pointer;

			var links;
			if (core.type(parent) === 'string') {
				links = doc.querySelectorAll(parent + ' .link');
			} else if (core.type(parent) === 'string') {
				links = parent.querySelectorAll('.link');
			}
			for (var i = 0, len = links.length; i < len; i++) {
				if (target.isSameNode(links[i])) {
					return i;
				}
			}

			return -1;
		},
		// Get the dom ele of next by direction.
		next: function(dir) {
			var pointer = this.pointer,
				pinfo = infos(pointer);
			var ninfo,
				pDvalue,
				mDvalue,
				pref,
				min;
			var sets = doc.querySelectorAll(this.sign);

			for (var i = 0, len = sets.length; i < len; i++) {
				if (!sets[i].isSameNode(pointer)) {
					ninfo = infos(sets[i], dir);

					if (core.visible(sets[i])) {
						var rule = rules(pinfo, ninfo, pDvalue, mDvalue, dir);

						pDvalue = rule.pDvalue;
						mDvalue = rule.mDvalue;
						rule.pref && (pref = sets[i]);
						rule.min && (min = sets[i]);
					}
				}
			}

			if (dir === 'left' || dir === 'right') {
				return pref;
			} else if (dir === 'up' || dir === 'down') {
				return pref || min;
			}
		},
		// Set the focus style.
		setRim: function() {
			if (this.pointer) {
				if (!this.box) {
					this.box = doc.createElement('div');
					this.box.className += this.rim.replace(/^\./g, '');
					doc.body.appendChild(this.box);
				}

				var pstyle = win.getComputedStyle(this.pointer, null);
				var pradius = parseInt(pstyle.borderRadius);
				var pborder = parseInt(pstyle.borderWidth);
				var pinfo = this.pointer.getBoundingClientRect();
				var bstyle = win.getComputedStyle(this.box, null);
				var bborder = parseInt(this.border ? this.border.match(/\d+(px)$/ig)[0] : bstyle.borderWidth);

				if (this.border && this.shadow) {
					this.box.style.cssText = 'width:' + pinfo.width + 'px;height:' + pinfo.height + 'px;border:' + this.border + ';border-radius:' + (pradius + bborder) + 'px;position:absolute;top:' + (pinfo.top - bborder) + 'px;left:' + (pinfo.left - bborder) + 'px;z-index: 9999;box-shadow:' + this.shadow + ';-webkit-box-shadow:' + this.shadow + ';-moz-box-shadow:' + this.shadow + ';-ms-box-shadow:' + this.shadow + ';-o-box-shadow:' + this.shadow + ';';
				} else {
					this.box.style.cssText = 'width:' + pinfo.width + 'px;height:' + pinfo.height + 'px;border-radius:' + (pradius + bborder) + 'px;position:absolute;top:' + (pinfo.top - bborder) + 'px;left:' + (pinfo.left - bborder) + 'px;z-index: 9999;';
				}

				if (core.type(this.effect) === 'number') {
					if (this.effect > 1 && this.effect < 5) {
						var bwidth = (pinfo.width - pborder * 2) * this.effect + pborder * 2,
							bheight = (pinfo.height - pborder * 2) * this.effect + pborder * 2;

						this.pointer.style.cssText = 'transform:scale(' + this.effect + ',' + this.effect + ');-webkit-transform:scale(' + this.effect + ',' + this.effect + ');-moz-transform:scale(' + this.effect + ',' + this.effect + ');-ms-transform:scale(' + this.effect + ',' + this.effect + ');-o-transform:scale(' + this.effect + ',' + this.effect + ');';
						this.box.style.cssText = 'width:' + bwidth + 'px;height:' + bheight + 'px;border:' + this.border + ';border-radius:' + (pradius * this.effect + bborder) + 'px;position:absolute;top:' + (pinfo.top - (bwidth - pinfo.width) / 2 - bborder) + 'px;left:' + (pinfo.left - (bheight - pinfo.width) / 2 - bborder) + 'px;z-index: 9999;box-shadow:' + this.shadow + ';-webkit-box-shadow:' + this.shadow + ';-moz-box-shadow:' + this.shadow + ';-ms-box-shadow:' + this.shadow + ';-o-box-shadow:' + this.shadow + ';';
					} else if (this.effect > 500 && this.effect < 2000) {
						var _this = this;

						this.twinkleTimer = setInterval(function() {
							bstyle = win.getComputedStyle(_this.box, null);

							if (bstyle.visibility === 'visible') {
								_this.box.style.visibility = 'hidden';
							} else {
								_this.box.style.visibility = 'visible';
							}
						}, _this.effect);
					}
				}
			}
		}
	};

	// Gets and calculates the element location information.
	function infos(target) {
		var info = target.getBoundingClientRect();

		return {
			left: info.left,
			right: info.left + info.width,
			up: info.top,
			down: info.top + info.height
		};
	}

	// Focus screening rule.
	function rules(pinfo, ninfo, pDvalue, mDvalue, dir) {
		var tmp, pref, min;

		if (dir === 'up') {
			if (pinfo.up > ninfo.down) {
				tmp = core.distance(ninfo.left, ninfo.down, pinfo.left, pinfo.up);
				(!mDvalue || tmp < mDvalue) && (mDvalue = tmp, min = true);
				(!pDvalue || (core.contains(ninfo.left, ninfo.right, pinfo.left, pinfo.right) && tmp < pDvalue)) && (pDvalue = tmp, pref = true);
			}
		} else if (dir === 'down') {
			if (pinfo.down < ninfo.up) {
				tmp = core.distance(ninfo.left, ninfo.up, pinfo.left, pinfo.down);
				(!mDvalue || tmp < mDvalue) && (mDvalue = tmp, min = true);
				(!pDvalue || (core.contains(ninfo.left, ninfo.right, pinfo.left, pinfo.right) && tmp < pDvalue)) && (pDvalue = tmp, pref = true);
			}
		} else if (dir === 'left') {
			if (pinfo.left > ninfo.right) {
				tmp = core.distance(ninfo.right, ninfo.up, pinfo.left, pinfo.up);
				(!mDvalue || tmp < mDvalue) && (mDvalue = tmp, min = true);
				(!pDvalue || (core.contains(ninfo.up, ninfo.down, pinfo.up, pinfo.down) && tmp < pDvalue)) && (pDvalue = tmp, pref = true);
			}
		} else if (dir === 'right') {
			if (pinfo.right < ninfo.left) {
				tmp = core.distance(ninfo.left, ninfo.up, pinfo.right, pinfo.up);
				(!mDvalue || tmp < mDvalue) && (mDvalue = tmp, min = true);
				(!pDvalue || (core.contains(ninfo.up, ninfo.down, pinfo.up, pinfo.down) && tmp < pDvalue)) && (pDvalue = tmp, pref = true);
			}
		}

		return {
			pDvalue: pDvalue,
			mDvalue: mDvalue,
			pref: pref,
			min: min
		};
	}

	return cursor;
})