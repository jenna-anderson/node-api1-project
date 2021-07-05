// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model');

const server = express()

server.use(express.json())

// ENDPOINTS

// [POST]
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

module.exports = server; // EXPORT YOUR SERVER instead of {}
