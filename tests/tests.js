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

// var labelCheck = new Date().getLabel,
//     mergeCheck = [].merge,
//     isDateCheck = new Date().isDate,
//     getCheck = {}.get,
//     phoneLabelCheck = ''.formatPhone,
//     trimCheck = ''.trim,
//     dateDeltaCheck = new Date().getDelta;

// var arr1 = [1,2,3,4,5],
//     arr2 = [6,7,8,9,0],
//     date1 = new Date(2000, 0, 1), // January 1st, 2000
//     date2 = new Date(2000, 0, 4), // January 4th, 2000
//     phoneString = "+(573)321-1124",
//     trimString = "    Hello Everyone!   ",
//     deepObj = {
//       name: [
//         {
//           first: 'Jen',
//           last: 'Powers'
//         },
//         {
//           first: 'Ken',
//           last: 'Powers'
//         }
//       ]
//     };

// document.getElementById('get-label').innerHTML =
//   labelCheck && new Date().getLabel() || labelCheck;

// document.getElementById('merge').innerHTML =
//   mergeCheck && arr1.merge(arr2) || mergeCheck;

// document.getElementById('is-date').innerHTML =
//   isDateCheck && ( 'Date is valid: ' + new Date().isDate()) || isDateCheck;

// document.getElementById('success-get').innerHTML =
//   getCheck && deepObj.get('name[0].last') || getCheck;

// document.getElementById('fail-get').innerHTML =
//   getCheck && deepObj.get('some.unknown[key].here');

// document.getElementById('phone-label').innerHTML =
//   phoneLabelCheck && phoneString.formatPhone() || phoneLabelCheck;
  
// document.getElementById('trim-label').innerHTML =
//   trimCheck && trimString.trim() || trimCheck;

// document.getElementById('date-delta').innerHTML = 
//   dateDeltaCheck && "<pre><code>" + JSON.stringify( date1.getDelta( date2 ), null, '  ' ) + "</code></pre>" || dateDeltaCheck;