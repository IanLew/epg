/*! epg-1.0.0.js create by Ian Lew 2018-03-21 */
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
    /**
     * Gets a value that indicates whether the DOM element visible.
     * @param  ele - DOM element.
     * @param  dir - top or left.
     * @return boolean.
     */
    visible: function (ele, dir) {
      if (ele.style.visibility === 'hidden' || ele.style.display === 'none' || ele.style.opacity === '0') {
        return false;
      } else {
        var pnode = ele.parentNode;
        while (true) {
          if (pnode.localName === 'body') {
            return true;
          }
          if (pnode.style.overflow === 'hidden') {
            if (dir === 'top') {
              if (ele.offsetTop + ele.offsetHeight > pnode.offsetHeight) {
              }
            } else if (dir === 'left') {
            }
          }
        }
      }
      return true;
    }
  };
  return core;
}();
epg = function (core) {
  return core;
}(modules_core);
return epg;
}));