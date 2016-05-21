//Setting up Express for server-side operations
var express = require('express')
var app = express()
var Nedb = require('nedb')
var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(express.static('../client'))

var database = new Nedb({
    filename: './data/data.db',
    autoload: true
})

app.post('/saveScene', function(req, res) {
//    if (editMode == false){
    database.insert({scene: req.body.scene},
        function() { //maybe change this with function(err,newDoc)
            console.log('I just wrote to the database')
            res.end("done") //Do I need to include this
        })
//    }
//    else 
})

app.put('/editScene', function(req, res) { //Maybe shouldn't use put?
    //Replaces the scene in the first braces with the entry in the second braces
    database.update({number:req.body.toEdit},{scene: req.body.scene}, //ALSO MAYBE NEED TO WRITE OUT EACH SEPERATE FIELD INSERTION SEPERATELY
        function() {
            console.log('I just edited the database')
            res.end("done")
        })
})

app.delete('/deleteScene', function(req, res) {
    database.remove({'number': req.body.toDelete},{}, 
        function(){ //maybe change this with 
            console.log('DB says I just deleted a scene')
            res.end("done") //Not sure whether I need to define numRemoved or whether NeDB does this automatically.
    })
})

    //Will need to integrate the loading of the scenes into one click instead of having to do another click
app.get('/loadScenes', function(req, res) {
    database.find({}, function(err, allScenes) {
        console.log('I just read stuff from the database')
        res.send(allScenes)
    })
})

var PORT = 8080
app.listen(PORT)

console.log("listening on " + PORT)

//app.put('/editScene', function(req, res) { //Maybe shouldn't use put?
//    //Replaces the scene in the first braces with the entry in the second braces
//    database.update({number:req.body.toEdit},{scene: req.body.scene}, //ALSO MAYBE NEED TO WRITE OUT EACH SEPERATE FIELD INSERTION SEPERATELY
//        function() {
//            console.log('I just edited the database')
//            res.end("done")
//        })
//})

//Just a thought to maybe, instead of updating, maybe just delete a scene? Would probably be bad from a user experience perspective