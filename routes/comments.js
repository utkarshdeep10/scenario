var express=require("express");
var app=express.Router();
var Comments=require("../models/comments");
var Products=require("../models/products");
var middleware=require("../middleware")

// Comments
app.post("/main/:id/comments",  middleware.isLogIn, function(req,res) {
    Products.findById(req.params.id, function(err,products){
        if(err) console.log(err);
        else {
            Comments.create(req.body.comment, function(err,comment) {
                if(err) console.log(err);
                //Adding user authentication to comments
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                comment.save()
                //====
                products.comments.push(comment);
                products.save();
                req.flash("success", "Comment Added")
                res.redirect("/main/" + req.params.id);
            });
        }
    });
});

app.delete("/main/:id/comments/:comments_id",  middleware.checkCommentLogIn, function(req,res) {
    Comments.findByIdAndRemove(req.params.comments_id, function(err){
        req.flash("success", "Comment Deleted");
        res.redirect("/main/" + req.params.id);
    });

});

module.exports = app;