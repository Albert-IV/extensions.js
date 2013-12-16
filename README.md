extensions.js
=============

The aim of this plugin is to add methods JavaScript natives to include missing or helpful functionality.  

Ever needed to get a human readable date from a Date object?  Ever reached deep into an object and gotten the inevitable Cannot read property 'x' of undefined?  Let's fix these minor headaches, with science!

(Well, JavaScript.  Almost the same.)

#DATES

## Date.prototype.isDate()
```javascript
var date = new Date()
  , badDate = new Date('This is not a date')

date.isDate();    // returns true
badDate.isDate(); // returns false

{}.isDate();      // returns false
"March".isDate()  // returns false
(55).isDate()     // returns false
```
This method returns `true` or `false` depending on if the Date object is a valid date.  No more `!isNaN(dateObj.getTime())`

## Date.prototype.getLabel()
```javascript
var date = new Date();
date.getLabel();    //  Returns in this format: "MTH DD YYYY"
```
This returns the date as a formatted date string.

## Date.prototype.getDelta()
```javascript
var date1 = new Date( 2000, 0, 1), date2 = new Date( 2000, 0, 4);
date1.getDelta( date2 );  // Returns object with delta

//  ============ OR ==============

var date1 = new Date( 2000, 0, 1), date2 = "January 4th, 2000";
date1.getDelta( date2 );  // Also accepts date strings
```
Returns an object with the caluclated delta difference.  Currently only up to day (ie no months are ever returned).


#ARRAYS
##Array.prototype.merge()
```javascript
var arr = [1, 2, 3];
arr.merge([4, 5, 6];  // Returns [1, 2, 3, 4, 5, 6]
```
This combines the two arrays together.  This does alter the original array, as well as returns the new value of the array.



#OBJECTS

##Object.prototype.get()
```javascript
var obj = { name : { first : "Al", last : "Bundy" } };
obj.get('name.last');  // returns "Bundy"
obj.get('path.not.in.object'); // Returns 0
```
This allows you to reach into objects and get their values, if it exists.  If it doesn't, will return 0.  The advantage of this is you avoid a dreaded `obj.name && obj.name.first` situation, and not have to worry about a malformed object blowing up your application.



#STRINGS

#String.prototype.formatPhone()
```javascript
var badlyFormattedPhone = "737-4844832 x58";
badlyFormattedPhone.formatPhone()
// returns "(737) 484-4832 x58"
```
This strips every non-number in the string, then formats occordingly.  If there aren't enough numbers, will fill the missing numbers with an underscore "_".  If the number is longer than a US phone number, it will consider the extra numbers an extension.

#String.prototype.trim()
```javascript
var str = "   No more spaces!          ";
str.trim();  // Returns "No more spaces!"
```
This method returns the string without leading or ending spaces.




####A Small Note

According to some, you shouldn't be adding prototypes to native JavaScript.  [Here's an article from someone who's probably smarter than me.](http://perfectionkills.com/extending-built-in-native-objects-evil-or-not/)

tl;dr
It's probably not as bad as you think.
