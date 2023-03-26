const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');

const { uploadMixOfImages } = require('../middlewares/uploadImageMiddlewares');
const factory = require('./handlersFactory');
const Product = require('../models/productModel');

exports.uploadProductImages = uploadMixOfImages([
  {
    name: 'imageCover',
    maxCount: 1,
  },
  {
    name: 'images',
    maxCount: 5,
  },
]);


exports.resizeProductImages = asyncHandler(async (req, res, next) => {

  //* 1- Image processing for imageCover
  if (req.files.imageCover) {
    const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;

    await sharp(req.files.imageCover[0].buffer)
      .resize(500,500)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/products/${imageCoverFileName}`);

    // Save image into our db
    req.body.imageCover = imageCoverFileName;
  }
  //2- Image processing for images
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

        await sharp(img.buffer)
          .resize(1000,1000)
          .toFormat('jpeg')
          .jpeg({ quality: 99 })
          .toFile(`uploads/products/${imageName}`);

        // Save image into our db
        req.body.images.push(imageName);
      })
    );

    next();
  }
});





  // TODO : desc    Get list of Products
  // ?    : route   GET /api/v1/Products
  // !    : access  Public

  exports.getProducts = factory.getAll(Product,{path:'category',select:"name"});
  




  // TODO : desc    Get specific Product by id
  // ?    : rout   GET /api/v1/Products/:id
  // !    : access  Public

  exports.getProduct = factory.getOne(Product,{path:'category',select:"name"});
  



  // TODO : desc    Create Product
  // ?    : rout   POST /api/v1/Products/
  // !    : access  private

  exports.createProduct = factory.createOne(Product);
  




  // TODO : desc    Update specific Product
  // ?    : rout   PUT /api/v1/Products/:id
  // !    : access  private

  exports.updateProduct = factory.updateOne(Product);




  // TODO : desc    Delete specific Product
  // ?    : rout   DELETE /api/v1/Products/:id
  // !    : access  private

  exports.deleteProduct = factory.deleteOne(Product);