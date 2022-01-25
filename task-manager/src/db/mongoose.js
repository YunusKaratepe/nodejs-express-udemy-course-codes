const mongoose = require('mongoose');
const validator = require('validator');


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number.')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid.')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.includes('password')) {
                throw new Error('Invalid password. Password must NOT contain the work "password".')
            }
            
        }
    }
})

const me = new User({
    name: ' Kerem     ',
    email: 'KEREMml@gmail.com    '
})

me.save().then(() => {
    console.log(me);
}).catch((err) => {
    if (err) console.log(err);    
})

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const task = new Task({
    description: "Empty the trash",
    completed: false
})

// task.save().then(() => {
//     console.log(task);
// }).catch((err) => {
//     if (err) console.log(err);
// }) 





