var labelCheck = new Date().getLabel,
    mergeCheck = [].merge,
    isDateCheck = new Date().isDate,
    getCheck = {}.get,
    phoneLabelCheck = ''.formatPhone;

var arr1 = [1,2,3,4,5],
    arr2 = [6,7,8,9,0],
    phoneString = "+(573)321-1124",
    deepObj = {
      name: [
        {
          first: 'Jen',
          last: 'Powers'
        },
        {
          first: 'Ken',
          last: 'Powers'
        }
      ]
    };

document.getElementById('get-label').innerHTML =
  labelCheck && new Date().getLabel() || labelCheck;

document.getElementById('merge').innerHTML =
  mergeCheck && arr1.merge(arr2) || mergeCheck;

document.getElementById('is-date').innerHTML =
  isDateCheck && ( 'Date is valid: ' + new Date().isDate()) || isDateCheck;

document.getElementById('success-get').innerHTML =
  getCheck && deepObj.get('name[0].last') || getCheck;

document.getElementById('fail-get').innerHTML =
  getCheck && deepObj.get('some.unknown[key].here');

document.getElementById('phone-label').innerHTML =
  phoneLabelCheck && phoneString.formatPhone() || phoneLabelCheck;
  