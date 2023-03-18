const mongoose = require('mongoose');

// TODO : Build the Structure of brand Schema

const brandSchema=new mongoose.Schema({
    name:{
        type:String,
        require:[true,'brand rerquired'],
        unique:[true,'brand must be unique'],
        minlength:[3,'Too short brand name'],
        maxlength:[32,'Too long brand name'],
    },
    slug:{
        type:String,
        lowercase:true,
    },
    image:String,

},{timestamps:true})        //? timestamps add the filed of time that you create and update the brand  

module.exports=mongoose.model('Brand',brandSchema)

