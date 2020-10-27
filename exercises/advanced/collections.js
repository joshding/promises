/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */
var Promise = require('bluebird');
var pluck = require('../bare_minimum/promiseConstructor.js');
var fs = require('fs');
/*
read each file, pluck first line, join the first lines.
IOCE: I: string string O: undefined?
Strategy:
return a promise, goes through array of filepaths, plcks the first line.
use pluckfirstlinefromfilesAsync for all files. use .then callbacks.
how do you get the resolve of the promises?
use the non-async version, add the first lines to an array, and then write that onto a writePath?
Use Promise.all?
so use a forloop through the filePaths,
*/

var combineFirstLineOfManyFiles = function(filePaths, writePath) {
  return new Promise((resolve, response)=> {
    var array = [];
    for (var i = 0; i < filePaths.length; i++) {
      array.push(pluck.pluckFirstLineFromFileAsync(filePaths[i]));
    }
    Promise.all(array).then((responses) => {
      var combinedText = responses.join('\n');
      fs.writeFile(writePath, combinedText, 'utf8', (err) => {
        if (err) {
          console.log('error!!!');
        }
        resolve();
      });
    });
  });
};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};