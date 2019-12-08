const express = require('express');

const router = express.Router({
    mergeParams: true
});
router.use(express.json())
const db = require('./../data/db');

// Find Comments by id of post
router.get('/', (req, res)=>{
    const id = req.params.id;
    if(!id){
        res.status(400).json({error: 'Please provide an id'});
    }else{
        db.findPostComments(id)
        .then(response =>{ 
            if(response.length === 0 ){
                res.status(404).json({ message: "The post with the specified ID does not exist." });
                }else{
                    res.status(200).json({ 
                        message: "Successful",
                        post: response
                    });

                }
            });

    }
});
//Find specific comment for a post
router.get('/:commentId', (req, res)=>{
    const commentId = req.params.commentId;

    if(!commentId){
        res.status(400).json({error: 'Please provide an id'});
    }else{
        db.findCommentById(commentId)
        .then(response =>{ 
            if(response.length === 0 ){
                res.status(404).json({ message: "The post with the specified ID does not exist." });
                }else{
                    res.status(200).json({ 
                        message: "Successful",
                        post: response
                    });

                }
            });

    }
});



//
router.post('/', (req, res) => {
    const comment = req.body.text;
    const id = req.params.id;

    db.insertComment({text: comment, post_id: id})
        .then(response => {
            res.status(200).json({ 
                message: "Successful",
                commentId: response.id
            });
        }).catch(error => {
            console.log(error)
        })
    res.send('Post Comments')
})


module.exports = router