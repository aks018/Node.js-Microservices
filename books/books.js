//load express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json()); 
//load mongosse
const mongoose = require("mongoose");

require("./book"); 
const Book = mongoose.model("Book")

//Connect avitanss@uci.edu
mongoose.connect("mongodb+srv://asharma:<Password>@avi-cluster-d1lsx.mongodb.net/test?retryWrites=true", { useNewUrlParser: true }, ()=>{
    console.log("Database is connected.");
});

app.get('/', (req,res) =>{
    res.send("This is our main endpoint! Changed this again.");
})

//Create functionality 
app.post("/book", (req,res) =>{
    var newBook={
        title:req.body.title,
        author:req.body.author,
        numberPages:req.body.numberPages,
        publisher:req.body.publisher
    }

    var book = new Book(newBook);
    book.save().then(() =>{
        console.log("New Book Created!");
    }).catch((err) =>{
        if(err){
            throw err; 
        }
    })
    res.send("A New Book Created With Success"); 
})

app.get("/books", (req,res) =>{
    Book.find().then((books) =>{
        res.json(books); 
    }).catch(err =>{
        if(err){
            throw err; 
        }
    })
})

app.get("/book/:id", (req,res) => {
    Book.findById(req.params.id).then((book) =>{
        if(book){
            res.json(book);
        }
        else{
            res.sendStatus(404); 
        }
    }).catch(err =>{
        if(err){
            throw err; 
        }
    })
})

app.delete("/book/:id", (req, res) =>{
    Book.findOneAndRemove(req.params.id).then(() =>{
        res.send("Book removed with sucess!");
    }).catch(err =>{
        if(err){
            throw err; 
        }
    })
})

app.listen(4545, () =>{
    console.log("Up and running! -- This is our Books service!")
    }
);