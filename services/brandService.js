const slugify=require('slugify')                          //* it's replace spaces or invaild syntax to '-' char
const asysnchandler=require('express-async-handler')      //* it's handel the promse and error without catch block
const Brand = require('../models/brandModel')
const factory = require('./handlersFactory');




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
