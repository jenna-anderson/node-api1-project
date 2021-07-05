// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model');

const server = express()

server.use(express.json())

// ENDPOINTS

// [POST] /api/users (created a new user)
server.post('/api/users', (req, res) => {
    const { id, name, bio } = req.body;
    if(!name || !bio) {
        res.status(400).json({message: "Please provide name and bio for the user"})
    }
    else{
        User.insert({ id, name, bio })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({
                message: "There was an error while saving the user to the database",
                custom: err.message
            })
        })
    }
})

// [GET] /api/users (fetches array of users)
server.get('/api/users', (req,res) => {
    User.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({
            message: "The users information could not be retrieved", 
            custom: err.message
        })
    })
})

// [GET] /api/users/:id (fetches a user by :id)
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    User.findById(id)
    .then(user => {
        if (!user) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
            res.status(200).json(user)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "The user information could not be retrieved",
            custom: err.message
        })
    })
})

// [DELETE] /api/users/:id (deletes user with :id)
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    User.remove(id)
    .then(user => {
        if (!user) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
            res.status(200).json(user)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "The user could not be removed",
            custom: err.message
        })
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
