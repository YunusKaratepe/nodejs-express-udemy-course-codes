const express = require('express');
const router = new express.Router();
const Task = require('../models/task')


router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.send(task)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    
    try {
        const task = await Task.findById(_id)
        if (!task) res.status(404).send()
        res.send(task)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updatesAvailable = ["description", "completed"]
    const updates = Object.keys(req.body)
    const isValidUpdate = updates.every((update) => updatesAvailable.includes(update))
    
    if (!isValidUpdate) res.status(400).send({ Error: "Updates are not valid." })

    try {
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body
        //     , { new: true, runValidators: true })

        const task = await Task.findById(req.params.id)
        updates.forEach((update) => task[update] = req.body[update])
        task.save()
        
        if (!task) return res.status(404).send()
        res.send(task)
    } catch (err) {
        res.status(500).send()
    }
})

router.delete('/tasks/:id', (req, res) => {
    try {
        const task = Task.findByIdAndDelete(req.params.id)
        
        if(!task) return res.status(404).send()

        res.send(task)
    } catch (err) {
        res.status(500).send()
    }
})


module.exports = router



