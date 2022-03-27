require('../src/db/mongoose')
const User = require('../src/models/user')

// 61ffedb560e3ad41d9fe0f7d
// 61ffeefe673d251c32a58e1f

// User.findByIdAndUpdate('61ffeefe673d251c32a58e1f', {
//     age: 1
// }).then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result);
// }).catch((err) => {
//     console.log(err);
// })

const updateAgeAndCount = async (id, age) => {
    await User.findByIdAndUpdate(id, { age }) // same with { age: age }
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('61ffedb560e3ad41d9fe0f7d', 2).then((count) => {
    console.log(count);

}).catch((err) => {
    console.log(err);
})









