
const validator = require('validator');
const chalk = require('chalk')
const yargs = require('yargs');

const notes = require('./notes');
const { string, argv } = require('yargs');

// customize yargs version
yargs.version('1.1.0')

// add, remove, read, list

// Create add command
yargs.command({
    command: "add",
    describe: "Add a new note.",
    builder: {
        title: {
            describe: "Note title.",
            demandOption: true, // w-o title the add command will not work.
            type: "string"
        },
        body: {
            describe: "Note body text.",
            demandOption: true,
            type: "string"
        }
    },
    handler (argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// Create remove command
yargs.command({
    command: "remove",
    describe: "Remove a note.",
    builder: {
        title: {
            describe: "Remove whichever note has this title.",
            demandOption: true,
            type: "string"
        }
    },
    handler () {
        console.log('Removing the note with title '+argv.title + "...");
        notes.removeNote(argv.title)
    }
})

// Create read command
yargs.command({
    command: "read",
    describe: "Read a note.",
    builder: {
        title: {
            describe: "Note title.",
            demandOption: true,
            type: "string"
        }
    },
    handler () {
        notes.readNote(argv.title)
    }
})

// Create list command
yargs.command({
    command: "list",
    describe: "List notes.",
    handler () {
        notes.listNotes()
    }
})

yargs.parse()

// console.log(yargs.argv);
