const fs = require('fs');
const pureReplace = require('./purify');

const inputFile = process.argv[2];
const inputFileBody = fs.readFileSync(inputFile).toString();

console.log(pureReplace(inputFileBody));