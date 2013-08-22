!function() {
  var DATE_EXT = {},
      ARR_EXT = {},
      OBJ_EXT = {};

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

  OBJ_EXT.get = (function() {
    var _get = function(obj, path) {
      var key = path.shift(),
          lb, rb, idx, val;

      lb = key.lastIndexOf('[');
      rb = key.slice(lb).indexOf(']');

      if( lb !== -1 && rb !== -1 ) {
        rb += lb;
        var _idx = key.substring( lb + 1, rb );

        idx = parseInt(_idx, 10) || _idx;
        key = key.substring(0, lb);

        if(!key) {
          key = idx;
          idx = false;
        }
      }

      if (idx && obj[key]) {
        val = obj[key][idx];
      } else {
        val = obj[key];
      }

      if(!!val && path.length > 0) return _get(val, path);
      return val;
    };

    return function(loc) {
      var locArr = loc.split('.');
      var searchArr = [];

      for ( var i = 0, l = locArr.length; i < l; i++ ) {
        var piece = locArr[i].replace(/\[([a-z]+)\]/ig, '.$1');

        if ( i === 0 && piece[i] === '.') piece = piece.slice(1);

        searchArr.push.apply( searchArr, piece.split('.') );
      }

      return _get(this, searchArr);
    };
  })();

  String.prototype.formatPhone = function() {
    var numStr = this.replace(/[^0-9]/g, '');
    var result = '';

    while (numStr.length < 10) {
      numStr += '_';
    }

    result += '(' + numStr.substring(0, 3) + ') ';
    result += numStr.substring(3, 6) + '-';
    result += numStr.substring(6, 10);

    if (numStr.length > 10) {
      result += ' x' + numStr.substring(11);
    }

    return result;
  };

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
        obj.prototype[extension] = extensions[extension];
      }
    };
  }

  extendMe(Date, DATE_EXT);
  extendMe(Array, ARR_EXT);
  extendMe(Object, OBJ_EXT);
}();
