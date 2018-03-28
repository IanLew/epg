define(['modules/core', 'modules/cursor', 'modules/swiper'], function(core, cursor, swiper) {
	core.extend({
		init: function(args) {
			var defaults = {
				controller: {},
				cursor: {
					sign: '.link',
					first: doc.querySelector('.link'),
					rim: '.pseudo',
					border: '#ffde00 solid 2px',
					shadow: '0 0 8px 1px #000',
					effect: null
				}
			};

			var config;
			if (!(args && args.border && args.shadow)) {
				var cfg = {};
				for (var i in defaults.cursor) {
					if (!/(border|shadow)/ig.test(i)) {
						cfg[i] = defaults.cursor[i];
					}
				}
				defaults.cursor = cfg;
			}
			config = core.extend({}, defaults, args);
			core.cursor = new cursor(config.cursor);

			core.left = config.controller.left;
			core.right = config.controller.right;
			core.up = config.controller.up;
			core.down = config.controller.down;
			core.enter = config.controller.enter;
			core.back = config.controller.back;
		},
		swiper: swiper
	});

	if (typeof Navigation !== 'undefined') {
		Navigation.disableDefaultNavigation();
		Navigation.disableHighlight();
	}

	function eventHandler(keycode) {
		if (keycode === 0x0025 || keycode === 0x0061) {
			core.left ? core.left() : core.cursor.left();
		} else if (keycode === 0x0026 || keycode === 0x0077) {
			core.up ? core.up() : core.cursor.up();
		} else if (keycode === 0x0027 || keycode === 0x0064) {
			core.right ? core.right() : core.cursor.right();
		} else if (keycode === 0x0028 || keycode === 0x0073) {
			core.down ? core.down() : core.cursor.down();
		} else if (keycode === 0x000d) {
			core.enter && core.enter();
		} else if (keycode === 0x0062 || keycode === 0x0008) {
			core.back && core.back();
		}
	}

	function grabEvent(e) {
		e = e || win.event;
		var keycode = e.which || e.keyCode;

		if (keycode === 0x0300) {
			if (typeof Utility !== 'undefined') {
				var oEvent = Utility.getEvent();
				eventHandler(oEvent.type, true);
			}
		} else {
			eventHandler(keycode);
		}
	}

	doc.onsystemevent = grabEvent;
	doc.onkeypress = grabEvent;
	doc.onirkeypress = grabEvent;

	return core;
});