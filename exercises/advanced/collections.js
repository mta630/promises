/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */
var fs = require('fs');
var Promise = require('bluebird');
var promiseConstructor = require('../bare_minimum/promiseConstructor.js');
var promisification = require('../bare_minimum/promisification.js');
var writeFile = Promise.promisify(fs.writeFile);

var combineFirstLineOfManyFiles = function(filePaths, writePath) {
  // perform pluckFirstLineFromFileAsync(filepath) on each element in filePaths array.
  // join each result from previous step into a new file seperated by \n
  // write that result into a new file at writePath
  var arrOfPromises = [];

  filePaths.forEach((path) => {
    arrOfPromises.push(promiseConstructor.pluckFirstLineFromFileAsync(path)
      .catch((err) => {
        console.log('there was an error');
      }));
  });

  return Promise.all(arrOfPromises).then((text) => {
    var textToWrite = text.join('\n');
    writeFile(writePath, textToWrite);
  }
  );
};


// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};