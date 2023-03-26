const Brand = require('../models/brandModel')
const factory = require('./handlersFactory');
const AsyncHandler = require('express-async-handler');


const {uploadSingleImage}=require("../middlewares/uploadImageMiddlewares")
const sharp=require('sharp');
const {v4:uuidv4} = require('uuid');      //* generate random id


// TODO : upload single image
exports.uploadBrandImage = uploadSingleImage("image")


// TODO : image processing
exports.resizeImage= AsyncHandler (async(req,rres,next) => {
  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`
await sharp(req.file.buffer)
.resize(600,600)
.toFormat("jpeg")
.jpeg({quality:99})
.toFile(`uploads/brands/${filename}`)
req.body.image=filename
next()
})



  // TODO : desc    Get list of brands
  // ?    : route   GET /api/v1/brands
  // !    : access  Public

  exports.getBrands = factory.getAll(Brand);
  




  // TODO : desc    Get specific Brand by id
  // ?    : rout   GET /api/v1/brands/:id
  // !    : access  Public

  exports.getBrand = factory.getOne(Brand);
  



  // TODO : desc    Create Brand
  // ?    : rout   POST /api/v1/brands/
  // !    : access  private

  exports.createBrand = factory.createOne(Brand);
  




  // TODO : desc    Update specific Brand
  // ?    : rout   PUT /api/v1/brands/:id
  // !    : access  private

  exports.updateBrand = factory.updateOne(Brand);




  // TODO : desc    Delete specific Brand
  // ?    : rout   DELETE /api/v1/brands/:id
  // !    : access  private

  exports.deleteBrand = factory.deleteOne(Brand);
