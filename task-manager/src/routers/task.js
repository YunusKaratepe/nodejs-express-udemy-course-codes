const express = require('express');
const router = new express.Router();
const Task = require('../models/task')
const auth = require('../middleware/auth')


router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })


    try {
        await task.save()
        res.send(task)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/tasks', auth, async (req, res) => {

    try {
        const tasks = await Task.find({ owner: req.user._id })
        res.send(tasks)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    
    try {
        const task = await Task.findOne({
            _id, owner: req.user._id
        })

        if (!task) res.status(404).send()
        res.send(task)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updatesAvailable = ["description", "completed"]
    const updates = Object.keys(req.body)
    const isValidUpdate = updates.every((update) => updatesAvailable.includes(update))
    
    if (!isValidUpdate) res.status(400).send({ Error: "Updates are not valid." })

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
    
        if (!task) return res.status(404).send()
        updates.forEach((update) => task[update] = req.body[update])
        task.save()

        res.send(task)
    } catch (err) {
        res.status(500).send()
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id, owner: req.user._id
        })
        
        if(!task) return res.status(404).send()

        res.send(task)
    } catch (err) {
        res.status(500).send()
    }
})


module.exports = router



