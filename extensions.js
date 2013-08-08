(function() {
  var OBJECT_EXT = {},
      DATE_EXT = {};

  var extendMe;

  DATE_EXT.getLabel = (function() {
    return function() {
      if( isNaN( this.getTime() ) ) return NaN;

      return (this.getMonth() + 1) + '/' + this.getDate() + '/' + this.getFullYear().toString().substr(2,2);
    };
  })();

  DATE_EXT.format = (function(options) {
    return function(options) {
      console.log(options);
    };
  })(options);

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
})();