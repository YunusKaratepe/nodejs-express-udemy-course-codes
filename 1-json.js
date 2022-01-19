const fs = require('fs');

/*
const book = {
    title: "Ego is the Enemy",
    author: "Ryan Holiday"
}

const book_str = JSON.stringify(book)
*/

/* console.log(book_str);

const book_json = JSON.parse(book_str)
console.log(book_json);

fs.writeFileSync('1-json.json', book_str) */

/*
const dataBuffer = fs.readFileSync('1-json.json')

data = dataBuffer.toString()
dataJSON = JSON.parse(data)


console.log(dataJSON.author);
*/


// CHALLANGE
let dataStr = fs.readFileSync('1-json.json').toString()
let dataJSON = JSON.parse(dataStr)

dataJSON['name'] = "Yunus"
dataJSON['age'] = 22

console.log(dataJSON);

dataStr = JSON.stringify(dataJSON)

fs.writeFileSync('1-json.json', dataStr)




