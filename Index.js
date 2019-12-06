const express = require('express');

const PORT = 8080;

const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200).send(`<h1> Welcome to Node-Api2, Enjoy the endpoints</h1>`)
})



app.listen(PORT, ()=>{
 console.log(`Server listening to http://localhost:${PORT}`)
})