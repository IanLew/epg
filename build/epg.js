/*! epg-1.0.0.js create by Ian Lew 2018-04-07 */
(function(win, doc, undefined) {
    var modules_core, modules_cursor, modules_swiper, epg;
    modules_core = function() {
        var arr = [];
        var class2type = {};
        var push = arr.push;
        var indexOf = arr.indexOf;
        var toString = class2type.toString;
        var hasOwn = class2type.hasOwnProperty;
        // epg core.
        var core = function() {
            return new core.fn.init();
        };
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
                return !core.isArray(obj) && realStringObj - parseFloat(realStringObj) + 1 >= 0;
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
                        pstyle;
                    while (true) {
                        pstyle = win.getComputedStyle(pnode, null);
                        if (pstyle.visibility === 'hidden' || pstyle.display === 'none' || pstyle.opacity === '0') {
                            return false;
                        }
                        if (pnode.localName === 'body') {
                            return true;
                        }
                        pnode = pnode.parentNode;
                    }
                    return true;
                }
            },
            // There is an intersection.
            contains: function(cmin, cmax, nmin, nmax) {
                return Math.max(cmin, nmin) <= Math.min(cmax, nmax);
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
            return type === 'array' || length === 0 || typeof length === 'number' && length > 0 && length - 1 in obj;
        }
        return core;
    }();
    modules_cursor = function(core) {
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
                var next, type = core.type(target);
                if (type === 'object' && target.nodeType) {
                    next = target;
                } else if (/up|down|right|left/gi.test(target)) {
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
                var ninfo, pDvalue, mDvalue, pref, min;
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
                    var bborder = parseInt(this.border ? this.border.match(/\d+(px)$/gi)[0] : bstyle.borderWidth);
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
                    (!pDvalue || core.contains(ninfo.left, ninfo.right, pinfo.left, pinfo.right) && tmp < pDvalue) && (pDvalue = tmp, pref = true);
                }
            } else if (dir === 'down') {
                if (pinfo.down < ninfo.up) {
                    tmp = core.distance(ninfo.left, ninfo.up, pinfo.left, pinfo.down);
                    (!mDvalue || tmp < mDvalue) && (mDvalue = tmp, min = true);
                    (!pDvalue || core.contains(ninfo.left, ninfo.right, pinfo.left, pinfo.right) && tmp < pDvalue) && (pDvalue = tmp, pref = true);
                }
            } else if (dir === 'left') {
                if (pinfo.left > ninfo.right) {
                    tmp = core.distance(ninfo.right, ninfo.up, pinfo.left, pinfo.up);
                    (!mDvalue || tmp < mDvalue) && (mDvalue = tmp, min = true);
                    (!pDvalue || core.contains(ninfo.up, ninfo.down, pinfo.up, pinfo.down) && tmp < pDvalue) && (pDvalue = tmp, pref = true);
                }
            } else if (dir === 'right') {
                if (pinfo.right < ninfo.left) {
                    tmp = core.distance(ninfo.left, ninfo.up, pinfo.right, pinfo.up);
                    (!mDvalue || tmp < mDvalue) && (mDvalue = tmp, min = true);
                    (!pDvalue || core.contains(ninfo.up, ninfo.down, pinfo.up, pinfo.down) && tmp < pDvalue) && (pDvalue = tmp, pref = true);
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
    }(modules_core);
    modules_swiper = function(core) {
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
                    if (!/autoPlay|speed|loop|pagination/gi.test(j)) {
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
                    if (!/scrollbar|distance/gi.test(k)) {
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
    }(modules_core);
    epg = function(core, cursor, swiper) {
        core.extend({
            init: function(args) {
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
                var config = core.extend(true, defaults, args);
                if (!args || args.mode === 'inline') {
                    core.cursor = new cursor(config.cursor);
                } else {
                    var cfg = {};
                    for (var i in config.cursor) {
                        if (!/border|shadow/gi.test(i)) {
                            cfg[i] = config.cursor[i];
                        }
                    }
                    core.cursor = new cursor(cfg);
                }
                core.left = config.controller.left;
                core.right = config.controller.right;
                core.up = config.controller.up;
                core.down = config.controller.down;
                core.enter = config.controller.enter;
                core.back = config.controller.back;
                core.state = 'initialization';
            },
            swiper: swiper
        });
        if (typeof Navigation !== 'undefined') {
            Navigation.disableDefaultNavigation();
            Navigation.disableHighlight();
        }

        function eventHandler(keycode) {
            if (keycode === 37 || keycode === 97) {
                core.left ? core.left() : core.cursor.left();
            } else if (keycode === 38 || keycode === 119) {
                core.up ? core.up() : core.cursor.up();
            } else if (keycode === 39 || keycode === 100) {
                core.right ? core.right() : core.cursor.right();
            } else if (keycode === 40 || keycode === 115) {
                core.down ? core.down() : core.cursor.down();
            } else if (keycode === 13) {
                core.enter && core.enter();
            } else if (keycode === 98 || keycode === 8) {
                core.back && core.back();
            }
        }

        function grabEvent(e) {
            e = e || win.event;
            var keycode = e.which || e.keyCode;
            if (keycode === 768) {
                if (typeof Utility !== 'undefined') {
                    var oEvent = Utility.getEvent();
                    core.state && eventHandler(oEvent.type, true);
                }
            } else {
                core.state && eventHandler(keycode);
            }
        }
        doc.onsystemevent = grabEvent;
        doc.onkeypress = grabEvent;
        doc.onirkeypress = grabEvent;
        return core;
    }(modules_core, modules_cursor, modules_swiper);
    win.epg = epg;
})(window, document);