require('../extensions.js')

var should = require('should');

describe('Date Extensions', function() {
  var date = new Date(2000, 0, 1),
      date2 = new Date(2000, 0, 4);

  describe('passing Test', function() {
    should(true).be.ok;
  })


  //////////////////////////////////////
  // Checks that date functions exist //
  //////////////////////////////////////


  it('should return truthy values for isDate', function() {
    var isDateCode = new Date().isDate;
    should( isDateCode ).be.ok;
  });

  it('should return truthy values for getLabel', function() {
    var getLabelCode = new Date().getLabel;
    should( getLabelCode ).be.ok;
  });

  it('should return truthy values for getDelta', function() {
    var getDeltaCode = new Date().getDelta;
    should( getDeltaCode ).be.ok;
  });


  ///////////////////////////////////////////////
  // Verifies Date extensions work as shoulded //
  ///////////////////////////////////////////////

  it('should have isDate return true', function() {
    should( date.isDate() ).be.ok;
    should( date2.isDate() ).be.ok;
    should( !{}.isDate() ).be.ok;
  });

  it('should have getLabel return correct string', function() {
    date.getLabel().should.equal( 'Jan 01 2000' );
    date2.getLabel().should.equal( 'Jan 04 2000');
  });

  describe('should have getDelta equal what is expected', function() {
    ( date.getDelta( date2 ) ).should.eql({ days : 3, hours : 0, minutes : 0, seconds : 0, milliseconds : 0 });
    ( date2.getDelta( date ) ).should.eql({ days : 3, hours : 0, minutes : 0, seconds : 0, milliseconds : 0 });
  });

});