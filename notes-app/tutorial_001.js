/* const fs = require('fs');
fs.writeFileSync('notes.txt', 'This is an example file message...')
fs.appendFileSync('notes.txt', '\nAppended KEKW.') */

const utils = require('./utils');
const validator = require('validator');
const chalk = require('chalk')


sum = utils.add(2, -6)
console.log(sum);
console.log(utils.getNotes());

email_test = 'yunus@skaratepe.com'
url_test = 'https://yunuskaratepe.com'

console.log(email_test + ' is Email? ' + validator.isEmail(email_test));
console.log(url_test + ' is URL? ' + validator.isURL(url_test));
console.log(chalk.green('Success!'));
console.log(chalk.green.inverse.bold('Success inversed color!'));
console.log(chalk.red.inverse.bold('Error!'));

console.log(process.argv[2]);

