/*! epg-1.0.0.js create by Ian Lew 2018-03-20 */
;(function(root, factory) {
if (typeof define === "function" && define.amd) {
define(factory);
} else if (typeof exports === "object") {
module.exports = factory();
} else {
root.epg = factory();
}
}(this, function() {
var modules_core, epg;
modules_core = function () {
  var core = function () {
    return new core.init();
  };
  core.fn = core.prototype = {
    constructor: core,
    toArray: function () {
      return slice.call(this);
    }
  };
  return core;
}();
epg = function (core) {
  return core;
}(modules_core);
return epg;
}));