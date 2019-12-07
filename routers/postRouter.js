const express = require('express');

const router = express.Router();

const db = require('./../data/db');

//Get endpoint
router.get('/', (req, res)=>{
    db.find()
        .then(response => {
            res.status(200).send({
                message: 'Get successful',
                post: response
            })
        })
})

// get specific post
router.get('/:id', (req, res)=>{
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
            })
            .catch(err => res.status(500).send({message: "The post information could not be retrieved." }))
    }
})

//Post to the Db
router.post('/', (req, res)=>{

    const { title, contents } =req.body
    if(!title || !contents){
        res.status(400).json({Error: 'Please Provide title and contents'});
    }else{
        db.insert({title, contents})
            .then(response => {
                res.status(201).send({
                    message: 'Post successful',
                    post: response
                });
            })
            .catch(err =>{
                res.status(500).json({error: "There was an error while saving the post to the database"})
            })
    }
});

//Delete

router.delete('/:id', (req, res)=>{
    const id = req.params.id;

    if(!id){
        res.status(404).send({message: `Error, You didn't provide an id for the delete request`})
    } else{
        db.remove(id)
            .then(response => {
                if(response  === 0){
                    res.status(404).send({message: "The post with the specified ID does not exist."})
                } else{
                    res.status(200).send({
                        message: 'Delete successful',
                    });
                }
            })
            .catch(err => res.status(500).send({message: "The post information could not be retrieved." }))
    }
})

//Update
router.put('/:id', (req, res)=>{
    
    const { title, contents } =req.body
    const id = req.params.id
    
    if(!title || !contents){
        res.status(400).json({Error: 'Please Provide title and contents'});
    } 
    else if (!id){
        res.status(400).json({Error: 'Please Provide an Id'});
    }
    else{
        db.update(id, {title, contents})
            .then(response => {
                if(response === 0 ){
                    res.status(404).send({message: "Please provide all the necessary information for the request "})
                }else{
                    res.status(201).send({
                        message: 'Put successful',
                        post: response
                    });
                }
            })
            .catch(err =>{
                res.status(500).json({error: "There was an error while Updating the post to the database"})
            })
    }
});
module.exports = router;