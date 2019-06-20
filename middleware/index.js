var Mid={};
var Products=require("../models/products");
var Comments=require("../models/comments");

// Checking if logged in
Mid.isLogIn = function (req, res, next) {
            if(req.isAuthenticated()){
                return next();
                }
            req.flash("error", "Please Login first");
            res.redirect("/login");
            }   

// For comments
Mid.checkCommentLogIn = function (req, res, next) {
                        if(req.isAuthenticated()){
                            Comments.findById(req.params.comments_id, function(err, foundcomments){
                                if(err) console.log(err);
                                else {
                                    if(foundcomments.author.id.equals(req.user._id))
                                        next();
                                    else {
                                        res.redirect("back");
                                    }
                                }
                            });
                        }
                        else {
                            req.flash("error", "Please Login first");
                            res.redirect("/login")
                        }
                    }

Mid.checkLogIn = function (req, res, next) {
                        if(req.isAuthenticated()){
                            Products.findById(req.params.id, function(err, products){
                                if(err) {
                                    req.flash("error", "Error 404: Data not found");
                                    res.redirect("back");
                                }
                                if (!products) {
                                    req.flash("error", "Item not found.");
                                    return res.redirect("back");
                                }
                                else {
                                    if(products.author.id.equals(req.user._id))
                                        next();
                                    else{
                                        req.flash("error", "Permission Denied");
                                        res.redirect("back");
                                    }
                                    }
                            });
                        }
                        else {
                            req.flash("error", "Please Login first");
                            res.redirect("/login")
                        }
                        }
module.exports = Mid;