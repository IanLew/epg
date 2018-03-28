define(function() {
	var arr = [];
	var class2type = {};
	var push = arr.push;
	var indexOf = arr.indexOf;
	var toString = class2type.toString;
	var hasOwn = class2type.hasOwnProperty;

	// epg core.
	var core = function() {
		return new core.fn.init();
	}

	core.fn = core.prototype = {
		constructor: core,
		each: function(callback) {
			return core.each(this, callback);
		}
	};

	// Extend tool.
	core.extend = core.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep;

		if (typeof target === 'boolean') {
			deep = target;
			target = arguments[i] || {};
			i++;
		}

		if (typeof target !== 'object' && !core.isFunction(target)) {
			target = {};
		}

		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {
			if ((options = arguments[i]) != null) {
				for (name in options) {
					src = target[name];
					copy = options[name];
					if (target === copy) {
						continue;
					}
					if (deep && copy && (core.isPlainObject(copy) || (copyIsArray = core.isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && core.isArray(src) ? src : [];
						} else {
							clone = src && core.isPlainObject(src) ? src : {};
						}
						target[name] = core.extend(deep, clone, copy);
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		return target;
	};

	core.extend({
		isNumeric: function(obj) {
			var realStringObj = obj && obj.toString();

			return !core.isArray(obj) && (realStringObj - parseFloat(realStringObj) + 1) >= 0;
		},
		isEmptyObject: function(obj) {
			for (var name in obj) {
				return false;
			}

			return true;
		},
		isArray: Array.isArray,
		isPlainObject: function(obj) {
			var key;

			if (core.type(obj) !== 'object' || obj.nodeType || core.isWindow(obj)) {
				return false;
			}
			if (obj.constructor && !hasOwn.call(obj, 'constructor') && !hasOwn.call(obj.constructor.prototype || {}, 'isPrototypeOf')) {
				return false;
			}

			for (key in obj) {}

			return key === undefined || hasOwn.call(obj, key);
		},
		isFunction: function(obj) {
			return core.type(obj) === 'function';
		},
		isWindow: function(obj) {
			return obj != null && obj === obj.window;
		},
		// Type checking.
		type: function(obj) {
			if (obj == null) {
				return obj + '';
			}

			return typeof obj === 'object' || typeof obj === 'function' ? class2type[toString.call(obj)] || 'object' : typeof obj;
		},
		// create array.
		makeArray: function(arr, results) {
			var ret = results || [];

			if (arr != null) {
				if (isArrayLike(Object(arr))) {
					core.merge(ret, typeof arr === 'string' ? [arr] : arr);
				} else {
					push.call(ret, arr);
				}
			}

			return ret;
		},
		// Merge two objects.
		merge: function(first, second) {
			var i = first.length;

			for (var j = 0; j < second.length; j++) {
				first[i++] = second[j];
			}
			first.length = i;

			return first;
		},
		// Find the array element that satisfies the filter function.
		grep: function(elems, callback, invert) {
			var callbackInverse, matches = [],
				i = 0,
				length = elems,
				callbackExpect = !invert;

			for (; i < length; i++) {
				callbackInverse = !callback(elems[i], i);
				if (callbackInverse !== callbackExpect) {
					matches.push(elems[i]);
				}
			}

			return matches;
		},
		// Traverse object.
		each: function(obj, callback) {
			var i = 0;

			if (isArrayLike(obj)) {
				var length = obj.length;

				for (; i < length; i++) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			} else {
				for (i in obj) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			}

			return obj;
		},
		// Check that the element is in the array.
		inArray: function(elem, arr, i) {
			return arr == null ? -1 : indexOf.call(arr, elem, i);
		},
		// The test element is visible.
		visible: function(ele) {
			var estyle = win.getComputedStyle(ele, null);
			if (estyle.visibility === 'hidden' || estyle.display === 'none' || estyle.opacity === '0') {
				return false;
			} else {
				var pnode = ele.parentNode,
					einfo = ele.getBoundingClientRect(),
					pinfo,
					pstyle;

				while (true) {
					pinfo = pnode.getBoundingClientRect();
					pstyle = win.getComputedStyle(pnode, null);

					if (pnode.localName === 'body') {
						if (einfo.top < 0 || einfo.top > win.innerHeight || einfo.left < 0 || einfo.left + einfo.width > win.innerWidth) {
							return false;
						} else {
							return true;
						}
					}

					if (pstyle.overflow === 'hidden') {
						if (einfo.top + einfo.height <= pinfo.top || einfo.top > pinfo.top + pinfo.height || einfo.left + einfo.width <= pinfo.left || einfo.left > pinfo.left + pinfo.width) {
							return false;
						}
					}

					pnode = pnode.parentNode;
				}

				return true;
			}
		},
		// There is an intersection.
		contains: function(cmin, cmax, nmin, nmax) {
			return (cmax - cmin) + (nmax - nmin) > Math.max(cmin, cmax, cmin, cmax) - Math.min(cmin, cmax, nmin, nmax);
		},
		// Calculate the distance between two points.
		distance: function(cx, cy, nx, ny) {
			return parseInt(Math.sqrt(Math.pow(cx - nx, 2) + Math.pow(cy - ny, 2)));
		}
	});

	var rootCore;
	var init = core.fn.init = function(root) {
		if (root === undefined) {
			root = rootCore;
			return this;
		}

		return core.makeArray(null, this);
	};

	init.prototype = core.fn;
	rootCore = core();

	core.each('Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '), function(i, name) {
		class2type['[object ' + name + ']'] = name.toLowerCase();
	});

	function isArrayLike(obj) {
		var length = !!obj && 'length' in obj && obj.length,
			type = core.type(obj);

		if (type === 'function' || core.isWindow(obj)) {
			return false;
		}

		return type === 'array' || length === 0 || typeof length === 'number' && length > 0 && (length - 1) in obj;
	}

	return core;
});