// Including Packages
var express=require("express"),
    app=express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    passport=require("passport"),
    LocalStrategy=require("passport-local"),
    passportLocalMongoose=require("passport-local-mongoose"),
    User=require("./models/user"),
    session=require("express-session"),
    productsroute=require("./routes/products"),
    authroute=require("./routes/auth"),
    commentsroute=require("./routes/comments"),
    flash=require("connect-flash")

// Some Methods
mongoose.connect('mongodb+srv://utkarsh:password3@scenario-cjrht.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine" , "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
mongoose.set('useFindAndModify', false);

// Authentication
app.use(session({
    secret: "Whatever",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


//Routes
app.use("/main", productsroute);
app.use(commentsroute);
app.use(authroute);

// Setting up server
app.listen(process.env.PORT || 3000, function() {
    console.log("Server started");
});
