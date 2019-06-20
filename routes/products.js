var express=require("express");
var app=express.Router();
var Products=require("../models/products");
var middleware=require("../middleware")

// DisplayPage
app.get("/" , function(req, res) {
    Products.find({},
        function(err,allproducts) {
        if(err) console.log(err);
        else res.render("index", {products: allproducts});
        });
});

// Adding New Location to databases
app.post("/", middleware.isLogIn, function(req, res) {
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newProduct = {name: req.body.name, image: req.body.image, content: req.body.content, author: author};
    Products.create(newProduct, function(err,newadded) {
        if(err) console.log(err);
        else res.redirect("/main");
    });
});

// Going to New Location Page
app.get("/new",  middleware.isLogIn, function(req, res) {
    res.render("addnew");
});

// Show Page
app.get("/:id", function(req,res) {
    Products.findById(req.params.id).populate("comments").exec(function(err, products){
        if(err) console.log(err)
        else res.render("show.ejs", {products: products});
    });
});

// Edit Page
app.get("/:id/edit",  middleware.checkLogIn, function(req, res) {
    Products.findById(req.params.id, function(err,products) {
        if(err) console.log(err);
        else res.render("edit", {products: products});
    })    
});

// Update
app.put("/:id",  middleware.checkLogIn, function(req,res) {
    Products.findByIdAndUpdate(req.params.id, { name: req.body.name, image: req.body.image, content: req.body.content }, function(err,product) {
        res.redirect("/main/" + req.params.id);
    });
});

// Delete Page
app.delete("/:id",  middleware.checkLogIn, function(req,res) {
    Products.findByIdAndRemove(req.params.id, function(err){
        res.redirect("/main");
    });
});

module.exports = app;