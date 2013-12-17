"use strict"
!function() {
  var DATE_EXT = {},
      ARR_EXT = {},
      OBJ_EXT = {};

  var extendMe;

  DATE_EXT.getLabel = (function() {
    return function() {
      if( isNaN( this.getTime() ) ) return '';

      return this.toString().split(' ').slice(1,4).join(' ');
    };
  })();

  DATE_EXT.getDelta = (function() {
    return function(deltaDate) {
      if( typeof deltaDate == "string" ) deltaDate = new Date(deltaDate);
      if( !this.isDate() || !deltaDate.isDate() ) return {};
      
      // Get # of milliseconds between dates
      var delta = this.getTime() > deltaDate.getTime() ?
                          this.getTime() - deltaDate.getTime() :
                          deltaDate.getTime() - this.getTime();

      // Set up some helper methods
      var toSecond = function(d) { return Math.floor( d / 1000 ); }
        , secondToMilli = function(d) { return d * 1000; }

        , toMinute = function(d) { return Math.floor( d / 1000 / 60 ); } 
        , minuteToMilli = function(d) { return d * 1000 * 60; }

        , toHour = function(d) { return Math.floor( d / 1000 / 60 / 60 ); }
        , hourToMilli = function(d) { return d * 1000 * 60 * 60; }

        , toDay = function(d) { return Math.floor( d / 1000 / 60 / 60 / 24 ); }
        , dayToMilli = function(d) { return d * 1000 * 60 * 60 * 24; };

      // Calculate Days and remove from total delta
      var dayDelta = toDay( delta );
      delta -= dayToMilli( dayDelta );

      // Calculate hours, remove from total again
      var hourDelta = toHour( delta );
      delta -= hourToMilli( hourDelta );

      // Calculate minutes
      var minuteDelta = toMinute( delta );
      delta -= minuteToMilli( minuteDelta );

      // And seconds
      var secondDelta = toSecond( delta );
      delta -= secondToMilli( secondDelta );
      // Leftover delta === millisecond time delta

      // Return that shit!
      return {
        "days" : dayDelta,
        "hours" : hourDelta,
        "minutes" : minuteDelta,
        "seconds" : secondDelta,
        "milliseconds" : delta
      };
    };
  })();


  ARR_EXT.merge = (function() {
    return function(arr) {
      Array.prototype.push.apply(this, arr);
      return this;
    };
  })();

  OBJ_EXT.isDate = (function() {
    return function() {
      return  this instanceof Date &&
              this.getTime &&
              !isNaN( this.getTime() ) ||
              false;
    }
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

  String.prototype.trim = function(str) {
    var string = str || this,
        changed = false;

    if (string.substr(0, 1) == ' ') {
      string = string.substring(1);
      changed = true;
    }

    if (string.substr((string.length -1), 1) == ' ') {
      string = string.substr(0, (string.length - 1));
      changed = true;
    }

    return (changed ? this.trim(string) : string);
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
        nativeObj.prototype[extension] = extensions[extension];
      }
    };
  }

  extendMe(Date, DATE_EXT);
  extendMe(Array, ARR_EXT);
  extendMe(Object, OBJ_EXT);
}();
