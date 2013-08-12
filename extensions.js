!function() {
  var DATE_EXT = {},
      ARR_EXT = {};

  var extendMe;

  DATE_EXT.getLabel = (function() {
    return function() {
      if( isNaN( this.getTime() ) ) return NaN;

      return (this.getMonth() + 1) + '/' + this.getDate() + '/' + this.getFullYear().toString().substr(2,2);
    };
  })();

  DATE_EXT.isDate = (function() {
    return function() {
      if( isNaN( this.getTime() ) ) return false;
      else return true;
    };
  })();

  ARR_EXT.merge = (function() {
    return function(arr) {
      Array.prototype.push.apply(this, arr);
      return this;
    };
  })();

  if (Object.defineProperty) {

    extendMe = function(nativeObj, extensions) {
      for (var extension in extensions) {
        Object.defineProperty( nativeObj.prototype, extension, {
          configurable  : true,
          writable      : true,
          enumerable    : false,
          value         : extensions[extension]
        });
      }
    };

  } else {

    extendMe = function(nativeObj, extensions) {
      for (var extension in extensions) {
        obj[extension] = extensions[extension];
      }
    };
  }

  extendMe(Date, DATE_EXT);
  extendMe(Array, ARR_EXT);
}();