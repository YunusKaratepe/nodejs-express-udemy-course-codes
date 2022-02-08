require("../src/db/mongoose")
const Task = require("../src/models/task");

// const idToDelete = "620029c1b2282b422001a482";
// Task.findByIdAndDelete(idToDelete).then((task) => {

//     console.log("*** Task ***");
//     console.log(task);
//     return Task.countDocuments({ completed: false })
// }).then((documentCount) => {

//     console.log("Uncompleted task count: " + documentCount);
// }).catch((err) => {

//     console.log(err);
// })

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({})
    return count
}

deleteTaskAndCount('620029c9b2282b422001a484').then((count) => {
    console.log('count: ' + count);
}).catch((err) => {
    console.log(err);
})

