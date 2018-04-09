var express = require('express')
const low = require('lowdb')
var bodyParser = require('body-parser')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('back.json')
const db = low(adapter)
var app = express()
var cors = require('cors')
app.use(cors())

app.use(bodyParser.json())


app.get('/api',(req,res)=>{
    db.defaults({data:[]}).write()
    var x=db.get('data').value()
    res.send(x)
})

app.post('/api', function(req, res){
    console.log(req.body)
    db.get('data').push({
        nama:req.body.nama, 
        usia:req.body.usia,
        status:req.body.status
    }).write()
    res.send({
        type:'POST', 
        nama:req.body.nama, 
        usia:req.body.usia,
        status:req.body.status
    })
})

app.listen(5000, function(){
    console.log('run @port 5000')
});