define(function() {
	var core = function() {
		return new core.init();
	};

	core.fn = core.prototype = {
		constructor: core,
		/**
		 * Gets a value that indicates whether the DOM element visible.
		 * @param  ele - DOM element.
		 * @param  dir - scrolling direction: 'top' or 'left'.
		 * @return boolean.
		 */
		visible: function(ele, dir) {
			if (ele.style.visibility === 'hidden' || ele.style.display === 'none' || ele.style.opacity === '0') {
				return false;
			} else {
				var pnode = ele.parentNode,
					einfo, pinfo;

				while (true) {
					if (pnode.localName === 'body') {

					} else if (pnode.style.overflow === 'hidden') {
						if (dir === 'top') {
							einfo = ele.getBoundingClientRect().top;
							pinfo = pnode.getBoundingClientRect().top;
							if (einfo + ele.offsetHeight <= pinfo || einfo > pinfo + pnode.offsetHeight) {
								return false;
							}
						} else if (dir === 'left') {
							einfo = ele.getBoundingClientRect().left;
							pinfo = pnode.getBoundingClientRect().left;
							if (einfo + ele.offsetWidth <= pinfo || einfo > pinfo + pnode.offsetWidth) {
								return false;
							}
						}
						pnode = pnode.parentNode;
					}
				}

				return true;
			}
		}
	};

	return core;
});