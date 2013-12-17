require('../extensions.js')

var should = require('should');

describe('Date.prototype', function() {
  var date = new Date(2000, 0, 1),
      date2 = new Date(2000, 0, 4);


  it('should return 1 equals 1', function() { (1).should.equal(1); });  
  //////////////////////////////////////
  // Checks that date functions exist //
  //////////////////////////////////////


  it('.isDate should return function for all types', function() {
    var dateIsDateCode   = new Date().isDate
      , objectIsDateCode = {}.isDate
      , arrayIsDateCode  = [].isDate
      , stringIsDateCode = "".isDate;

    ( dateIsDateCode ).should.be.ok;
    ( typeof dateIsDateCode ).should.equal( "function" );

    ( objectIsDateCode ).should.be.ok;
    ( typeof objectIsDateCode ).should.equal( "function" );
    
    ( arrayIsDateCode ).should.be.ok;
    ( typeof arrayIsDateCode ).should.equal( "function" );

    ( stringIsDateCode ).should.be.ok;
    ( typeof stringIsDateCode ).should.equal( "function" );
  });

  it('.getLabel should return function', function() {
    var getLabelCode = new Date().getLabel;
    
    ( getLabelCode ).should.be.ok;
    ( typeof getLabelCode ).should.equal( "function" );
  });

  it('.getDelta should return function', function() {
    var getDeltaCode = new Date().getDelta;

    ( getDeltaCode ).should.be.ok;
    ( typeof getDeltaCode ).should.equal( "function" );
  });


  ///////////////////////////////////////////////
  // Verifies Date extensions work as should //
  ///////////////////////////////////////////////

  it('.isDate() should return true for actual dates', function() {
    ( date.isDate()  ).should.equal( true );
    ( date2.isDate() ).should.equal( true );
  });

  it('.isDate() should return false for non-valid types/ values', function() {
    ( new Date('Malformed Date String').isDate() ).should.not.be.ok;
    ( {}                               .isDate() ).should.not.be.ok;
    ( ("")                             .isDate() ).should.not.be.ok;
    ( (55)                             .isDate() ).should.not.be.ok;
  });

  it('.getLabel() should return expected string', function() {
    (  date.getLabel() ).should.equal( 'Jan 01 2000' );
    ( date2.getLabel() ).should.equal( 'Jan 04 2000' );
  });

  it('.getDelta() should equal expected deltas', function() {
    ( date.getDelta( date2 ) ).should.eql({ days : 3, hours : 0, minutes : 0, seconds : 0, milliseconds : 0 });
    ( date2.getDelta( date ) ).should.eql({ days : 3, hours : 0, minutes : 0, seconds : 0, milliseconds : 0 });
  });

  it('.getDelta() for invalid dates should return empty Object', function() {
    var invalidDateDelta = date.getDelta( new Date('Invalid Date String')  );

    ( typeof invalidDateDelta            ).should.equal( "object" );
    ( JSON.stringify( invalidDateDelta ) ).should.equal( "{}" );
  });

});

describe('Array Extensions', function() {

  it('.merge should return function', function() {
    var merge = [].merge;

    ( merge ).should.be.ok;
    ( typeof merge ).should.equal( "function" );
  });

  it('.merge() should return merged array', function() {
    var arr1 = [1,2,3],
        arr2 = [4,5,6];

    ( arr1.merge(arr2) ).should.eql([1, 2, 3, 4, 5, 6]);
  });

  it('.merge() alter original array', function() {
    var arr1 = [1,2,3],
        arr2 = [4,5,6];

    arr1.merge(arr2);
    arr1.should.eql([1, 2, 3, 4, 5, 6]);
  });
});

describe('Object Extensions', function() {

  it('.get should return function', function() {
    var getFunction = {}.get;

    ( getFunction ).should.be.ok;
    ( typeof getFunction ).should.equal( "function" );
  });

  it('.get() on obj.key should work', function() {
    var obj = { foo : "bar" };

    ( obj.get("foo") ).should.equal('bar');
    ( typeof obj.get("name") ).should.equal( "undefined" );
  });

  it('.get() o obj.key[i] should work', function() {
    var obj = { arr : [ "string"] };

    ( obj.get("arr[0]") ).should.equal( "string" );
    ( typeof obj.get("arr[2]") ).should.equal( "undefined" );
  });

  it('.get() should work on arrays too!', function() {
    var obj = { arr : [ ]}
    var arrObj = [ "string", { name : 'Jim' } ];

    ( arrObj.get('[0]') ).should.equal( "string" );
    ( arrObj.get('[1]') ).should.eql( { name : "Jim" } );
    ( typeof arrObj.get('[3]') ).should.equal( "undefined" );
  });

  /*
    TODO: Handle more edge-cases.
     - dot syntax for arrays:  obj.arr.0.someOtherProperty
     - syntax-mix?:  obj.arr[0].anotherArr.0
  */
});

describe('String Extensions', function() {

  it('.formatPhone should return function', function() {
    var formatPhone = "".formatPhone;

    ( formatPhone ).should.be.ok;
    ( typeof formatPhone ).should.equal( 'function' );
  });

  it('.formatPhone should return expected format', function() {
    var formattedPhone = "737-4844832 x58";

    ( formattedPhone.formatPhone() ).should.equal( "(737) 484-4832 x58" )
  });
});