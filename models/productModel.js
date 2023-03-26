const { default: mongoose } = require("mongoose")
// const mongoose = require('mongoose');

const productSchema=new mongoose.Schema({
    title:{
        type: String,
        required:true,
        trim:true,
        minlength:[3,"Too short product title"],
        maxlength:[100,'Too short product title'],
    },
    slug:{
        type:String,
        lowercase:true,
    },
    description:{
        type: String,
        required:[true,"product description is required"],
        trim:true,
        minlength:[20,"Too description product title"],
        maxlength:[1000,'Too description product title'],
    },
    quantity:{
        type:Number,
        required:[true,'product quantity is required'],
    },
    sold:{
        type:Number,
        default:0,
    },
    price:{
        type:Number,
        required:[true,'product price is required'],
        trim:true,
        max:[1000,'Too long product price'],
    },
    priceAfterDiscount:{
        type:Number,
    },
    colors:[String],
    imageCover:{
        type:String,
        required:[true,'product image cover is required'],
    },
    images:[String],
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'Category',
        required:[true,'product must be belong to category'],
    },
    subcategories:[{
        type:mongoose.Schema.ObjectId,
        ref:'SubCategory',
    }],
    brand:{
        type:mongoose.Schema.ObjectId,
        ref:'Brand',
    },
    ratingsAverage:{
        type:Number,
        min:[1,'Ratings must be above or equal 1.0'],
        max:[5,'Ratings must be below or equal 5.0'],
    },
    ratingsQuantity:{
        type:Number,
        default:0,
    },
},
{timestamps:true})


  const setImageURL = (doc) => {
    if (doc.imageCover) {
      const imageUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
      doc.imageCover = imageUrl;
    }
    if (doc.images) {
      const imagesList = [];
      doc.images.forEach((image) => {
        const imageUrl = `${process.env.BASE_URL}/products/${image}`;
        imagesList.push(imageUrl);
      });
      doc.images = imagesList;
    }
  };
  // findOne, findAll and update
  productSchema.post('init', (doc) => {
    setImageURL(doc);
  });
  
  // create
  productSchema.post('save', (doc) => {
    setImageURL(doc);
  });
  

    module.exports=mongoose.model('Product',productSchema)
