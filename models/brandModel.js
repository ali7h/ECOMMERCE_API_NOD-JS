const mongoose = require('mongoose');

// TODO : Build the Structure of brand Schema

const brandSchema=new mongoose.Schema({
    name:{
        type:String,
        require:[true,'brand rerquired'],
        unique:[true,'brand must be unique'],
        minlength:[2,'Too short brand name'],
        maxlength:[32,'Too long brand name'],
    },
    slug:{
        type:String,
        lowercase:true,
    },
    image:String,

},{timestamps:true})        //? timestamps add the filed of time that you create and update the brand  



const setImageURL = (doc) => {
    if (doc.image) {
      const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
      doc.image = imageUrl;
    }
  };
  // findOne, findAll and update
  brandSchema.post('init', (doc) => {
    setImageURL(doc);
  });
  
  // create
  brandSchema.post('save', (doc) => {
    setImageURL(doc);
  });
  


module.exports=mongoose.model('Brand',brandSchema)

