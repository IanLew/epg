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
		eqParent: function(target) {
			if (core.type(target) === 'object' && target.nodeType) {
				var pnode = this.pointer.parentNode;

				while (true) {
					if (pnode.localName === 'body') {
						if (target.isEqualNode(pnode)) {
							return true;
						} else {
							return false;
						}
					} else if (target.isEqualNode(pnode)) {
						return true;
					} else {
						pnode = pnode.parentNode;
					}
				}
			}

			return false;
		},
		// Get the dom ele of next by direction.
		next: function(dir) {
			var pointer = this.pointer,
				pinfo = infos(pointer);
			var ninfo,
				dvalue,
				pref,
				min;
			var sets = doc.querySelectorAll(this.sign);

			for (var i = 0, len = sets.length; i < len; i++) {
				if (!sets[i].isEqualNode(pointer)) {
					ninfo = infos(sets[i], dir);

					if (core.visible(sets[i], dir)) {
						var rule = rules(pinfo, ninfo, dvalue, dir);

						dvalue = rule.dvalue || dvalue;
						rule.pref && (pref = sets[i]);
						rule.min && (min = sets[i]);
					}
				}
			}

			return pref || min;
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
				var bborder = parseInt(this.border.match(/\d+(px)$/ig)[0]);

				this.box.style.cssText = 'width:' + pinfo.width + 'px;height:' + pinfo.height + 'px;border:' + this.border + ';border-radius:' + (pradius + bborder) + 'px;position:absolute;top:' + (pinfo.top - bborder) + 'px;left:' + (pinfo.left - bborder) + 'px;z-index: 9999;box-shadow:' + this.shadow + ';-webkit-box-shadow:' + this.shadow + ';-moz-box-shadow:' + this.shadow + ';-ms-box-shadow:' + this.shadow + ';-o-box-shadow:' + this.shadow + ';';

				if (core.type(this.effect) === 'number') {
					if (this.effect > 1 && this.effect < 5) {
						var bwidth = (pinfo.width - pborder * 2) * this.effect + pborder * 2,
							bheight = (pinfo.height - pborder * 2) * this.effect + pborder * 2;

						this.pointer.style.cssText = 'transform:scale(' + this.effect + ',' + this.effect + ');-webkit-transform:scale(' + this.effect + ',' + this.effect + ');-moz-transform:scale(' + this.effect + ',' + this.effect + ');-ms-transform:scale(' + this.effect + ',' + this.effect + ');-o-transform:scale(' + this.effect + ',' + this.effect + ');';
						this.box.style.cssText = 'width:' + bwidth + 'px;height:' + bheight + 'px;border:' + this.border + ';border-radius:' + (pradius * this.effect + bborder) + 'px;position:absolute;top:' + (pinfo.top - (bwidth - pinfo.width) / 2 - bborder) + 'px;left:' + (pinfo.left - (bheight - pinfo.width) / 2 - bborder) + 'px;z-index: 9999;box-shadow:' + this.shadow + ';-webkit-box-shadow:' + this.shadow + ';-moz-box-shadow:' + this.shadow + ';-ms-box-shadow:' + this.shadow + ';-o-box-shadow:' + this.shadow + ';';
					} else if (this.effect > 500 && this.effect < 2000) {
						var _this = this;

						this.twinkleTimer = setInterval(function() {
							var bstyle = win.getComputedStyle(_this.box, null);

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
	function rules(pinfo, ninfo, dvalue, dir) {
		var tmp, pref, min;

		if (dir === 'up') {
			if (pinfo.up > ninfo.down) {
				tmp = core.distance(ninfo.left, ninfo.down, pinfo.left, pinfo.up);
				dvalue = typeof dvalue === 'undefined' ? tmp : Math.min(tmp, dvalue);
				if (tmp === dvalue) {
					min = true;
					if (core.contains(ninfo.left, ninfo.right, pinfo.left, pinfo.right)) {
						pref = true;
					}
				}
			}
		} else if (dir === 'down') {
			if (pinfo.down < ninfo.up) {
				tmp = core.distance(ninfo.left, ninfo.up, pinfo.left, pinfo.down);
				dvalue = typeof dvalue === 'undefined' ? tmp : Math.min(tmp, dvalue);
				if (tmp === dvalue) {
					min = true;
					if (core.contains(ninfo.left, ninfo.right, pinfo.left, pinfo.right)) {
						pref = true;
					}
				}
			}
		} else if (dir === 'left') {
			if (pinfo.left > ninfo.right) {
				tmp = core.distance(ninfo.right, ninfo.up, pinfo.left, pinfo.up);
				dvalue = typeof dvalue === 'undefined' ? tmp : Math.min(tmp, dvalue);
				if (tmp === dvalue) {
					min = true;
					if (core.contains(ninfo.up, ninfo.down, pinfo.up, pinfo.down)) {
						pref = true;
					}
				}
			}
		} else if (dir === 'right') {
			if (pinfo.right < ninfo.left) {
				tmp = core.distance(ninfo.left, ninfo.up, pinfo.right, pinfo.up);
				dvalue = typeof dvalue === 'undefined' ? tmp : Math.min(tmp, dvalue);
				if (tmp === dvalue) {
					min = true;
					if (core.contains(ninfo.up, ninfo.down, pinfo.up, pinfo.down)) {
						pref = true;
					}
				}
			}
		}

		return {
			dvalue: dvalue,
			pref: pref,
			min: min
		};
	}

	return cursor;
});