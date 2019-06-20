var mongoose = require("mongoose");
 
var productsSchema = new mongoose.Schema({
   name: String,
   image: String,
   content: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comments"
      }
   ]
});
 
module.exports = mongoose.model("Products", productsSchema);