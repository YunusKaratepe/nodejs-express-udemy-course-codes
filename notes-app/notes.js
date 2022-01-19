
const fs = require('fs');
const chalk = require('chalk')
const { exit } = require('process');
const { array } = require('yargs');

const getNotes = () => {
    notes = fs.readFileSync('./notes.txt', {encoding:'utf8'})
    return notes        
}

const addNote = (title, body) => {
    const notes = loadNotes()

    // if note title already exists, not gonna add it.
    /*
    for (let i = 0; i < notes.length; i++) {
        if (title === notes[i].title) {
            console.log(chalk.red.bold('This note title already exists.'));
            return 
        }
    }
    */


    const duplicateNote = notes.find((note) => note.title === title)
    if (duplicateNote) {
        console.log(chalk.red.bold('This note title already exists.'));
        return 
    }
    notes.push({
        "title": title,
        "body": body
    })
    saveNotes(notes)
    console.log(chalk.blue.bold('Your note has been added.'));
}

const saveNotes = (notes) => {
    const dataStr = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataStr)
}

const loadNotes = () => {

    try {
        const dataStr = fs.readFileSync('notes.json').toString()
        return JSON.parse(dataStr)
    } catch (e) {
        return []
    }
}

const removeNote = (title) => {

    const notes = loadNotes()
    for(let i = 0; i < notes.length; i++) {
        if (title === notes[i].title) {
            notes.splice(i, 1);
            console.log(chalk.blue.bold('Note has removed successfully.'));
            saveNotes(notes)
            return true
        }
    }
    console.log(chalk.red.bold('Note couldn\'t find with given title.'));
    return false
}

const listNotes = () => {
    const notes = loadNotes()
    notes.forEach(note => {
        console.log(note.title);
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    note2Read = notes.find((note) => note.title === title)

    if (note2Read) {
        console.log(chalk.blueBright(note2Read.title));
        console.log(note2Read.body);
    }
    else {
        console.log(chalk.red('Note could not find with given title!'));
    }
    
}




module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}