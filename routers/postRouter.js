const express = require('express');

const router = express.Router();

const db = require('./../data/db');

//Get endpoint
router.get('/api/post', (req, res)=>{
    db.find()
        .then(response => {
            res.status(200).send({
                message: 'Get successful',
                post: response
            })
        })
})

// get specific post
router.get('/api/post/:id', (req, res)=>{
    const id = req.params.id;

    if(!id){
        res.status(404).send({message: `Error, You didn't provide an id for the post request`})
    } else{
        db.findById(id)
        .then(response => {
            if(response.length < 1){
                res.status(404).send({message: "The post with the specified ID does not exist."})
            } else{
                res.status(200).send({
                    message: 'Get successful',
                    post: response
                });
            }
        }).catch(err => res.status(500).send({message: "The post information could not be retrieved." }))
    }
})

module.exports = router;