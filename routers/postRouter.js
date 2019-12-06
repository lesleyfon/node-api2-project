const express = require('express');

const router = express.Router();

const db = require('./../data/db');

//Get endpoint
router.get('/api/post', (req, res)=>{
    db.find()
        .then(response => {
            console.log(response)
            res.status(200).send({
                message: 'Get successful',
                post: response
            })
        })
})



module.exports = router;