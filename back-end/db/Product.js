const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name:{
        type:String
    },
    price:{
        type:String
    },
    category:{
        type:String
    },
    userid:{
        type:String
    },
    company:{
        type:String
    }
})

const Product=new mongoose.model("Product",productSchema);

module.exports=Product;