(function() {
  var OBJECT_EXT = {},
      DATE_EXT = {};

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

})();