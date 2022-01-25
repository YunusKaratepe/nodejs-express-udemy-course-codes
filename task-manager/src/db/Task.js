const { model } = require('mongoose');


const Task = new model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

export default {Task}
