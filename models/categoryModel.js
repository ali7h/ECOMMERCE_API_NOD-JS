const mongoose = require('mongoose');

// TODO : Build the Structure of Category Schema

const CategorySchema=new mongoose.Schema({
    name:{
        type:String,
        require:[true,'Category rerquired'],
        unique:[true,'Category must be unique'],
        minlength:[3,'Too short category name'],
        maxlength:[32,'Too long category name'],
    },
    slug:{
        type:String,
        lowercase:true,
    },
    image:String,

},{timestamps:true})        //? timestamps add the filed of time that you create and update the category  


const setImageURL = (doc) => {
    if (doc.image) {
      const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
      doc.image = imageUrl;
    }
  };
  // findOne, findAll and update
  CategorySchema.post('init', (doc) => {
    setImageURL(doc);
  });
  
  // create
  CategorySchema.post('save', (doc) => {
    setImageURL(doc);
  });
  

const categoryModel=mongoose.model('Category',CategorySchema)

module.exports=categoryModel