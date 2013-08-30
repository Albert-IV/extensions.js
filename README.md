extensions.js
=============

The aim of this plugin is to add methods JavaScript natives to include missing or helpful functionality.  

Ever needed to get a human readable date from a Date object?  Ever reached deep into an object and gotten the inevitable Cannot read property 'x' of undefined?  Let's fix these minor headaches, with science!

(Well, JavaScript.  Almost the same.)

#DATES

## Date.prototype.isDate()
```javascript
var date = new Date();
date.isDate();    // returns true
```
This method returns `true` or `false` depending on if the Date object is a valid date.  No more `!isNaN(dateObj)`

## Date.prototype.getLabel()
```javascript
var date = new Date();
date.getLabel();    //  Returns in this format: "MM/DD/YY"
```
This returns the American-formatted date as a String. (Sorry, rest of the world!)



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






