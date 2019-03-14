const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json()); 
const mongoose = require("mongoose");

require("./Customer"); 
const Customer = mongoose.model("Customer")

mongoose.connect("mongodb+srv://asharma:<Password>@avi-cluster-d1lsx.mongodb.net/test?retryWrites=true", { useNewUrlParser: true }, ()=>{
    console.log("Database is connected.");
});


app.listen("5555", () => {
    console.log("Up and running - Customers Service")
})

app.get('/', (req,res) =>{
    res.send("This is our main endpoint! Changed this again.");
})

app.post("/customer", (req,res) =>{
    var newCustomer={
        name:req.body.name,
        age:req.body.age,
        address:req.body.address
    }

    var customer = new Customer(newCustomer);
    customer.save().then(() =>{
        console.log("New Customer Created!");
    }).catch((err) =>{
        if(err){
            throw err; 
        }
    })
    res.send("A New Customer Created With Success"); 
})


app.get("/customers", (req,res) =>{
    Customer.find().then((customers) =>{
        res.json(customers); 
    }).catch(err =>{
        if(err){
            throw err; 
        }
    })
})

app.get("/customer/:id", (req,res) => {
    Customer.findById(req.params.id).then((customer) =>{
        if(customer){
            res.json(customer);
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

app.delete("/customer/:id", (req, res) =>{
    Customer.findOneAndRemove(req.params.id).then(() =>{
        res.send("Customer removed with sucess!");
    }).catch(err =>{
        if(err){
            throw err; 
        }
    })
})