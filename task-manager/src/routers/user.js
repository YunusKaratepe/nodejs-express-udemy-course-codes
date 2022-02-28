const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
        
    // without async
    // user.save().then(() => {
    //     res.send(user);
    // }).catch((err) => {
    //     res.status(400).send(err)
    // }) 
})

router.get('/users', async (req, res) =>{
    try {
        const users = await User.find({})
        res.send(users)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch ({ message }) {
        res.status(400).send(message)
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) return res.status(404).send()
        res.send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({"error": "Invalid updates"})
    }

    try {
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, 
        //     { new: true, runValidators: true })

        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save();

        if (!user) return res.status(404).send()
        res.send(user)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) return res.status(404).send()

        res.send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})
module.exports = router