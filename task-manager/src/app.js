const express = require('express');
require('./db/mongoose')

// routers
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express();

app.use(express.json())

// app.use((req, res, next) => {
//     res.status(503).send("Server is now under maintenance.")
// })

app.use(userRouter)
app.use(taskRouter)

module.exports = app