const express  = require('express');

const app = express();

app.get('/', (req, res)=>{
    res.send('💙Docker TEST page💚')
});

app.listen(8080, ()=> console.log('server is running💨'))