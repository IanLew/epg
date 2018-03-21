define(function() {
	var core = function() {
		return new core.init();
	};

	core.fn = core.prototype = {
		constructor: core,

	};

	return core;
});