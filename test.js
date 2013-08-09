var labelCheck = new Date().getLabel,
    mergeCheck = [].merge;

var arr1 = [1,2,3,4,5],
    arr2 = [6,7,8,9,0];

document.getElementById('get-label').innerHTML = labelCheck && new Date().getLabel() || labelCheck;
document.getElementById('merge').innerHTML = mergeCheck && arr1.merge(arr2) || mergeCheck;