const slugify=require('slugify')                          //* it's replace spaces or invaild syntax to '-' char
const asysnchandler=require('express-async-handler')      //* it's handel the promse and error without catch block
const Product=require('../models/productModel')
const ApiError = require('../utils/ApiError')
const ApiFeatures = require('../utils/ApiFeatures')
const factory = require('./handlersFactory');






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