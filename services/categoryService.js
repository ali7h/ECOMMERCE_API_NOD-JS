const Category=require('../models/categoryModel')
const factory = require('./handlersFactory');


//* it's replace spaces or invaild syntax to '-' char

  // TODO : desc    Get list of categories
  // ?    : route   GET /api/v1/categories
  // !    : access  Public

  exports.getCategories = factory.getAll(Category);
  




  // TODO : desc    Get specific category by id
  // ?    : rout   GET /api/v1/categories/:id
  // !    : access  Public

  exports.getCategory = factory.getOne(Category);
  



  // TODO : desc    Create Category
  // ?    : rout   POST /api/v1/categories/
  // !    : access  private

  exports.createCategory = factory.createOne(Category);
  




  // TODO : desc    Update specific category
  // ?    : rout   PUT /api/v1/categories/:id
  // !    : access  private

  exports.updateCategory = factory.updateOne(Category);




  // TODO : desc    Delete specific Category
  // ?    : rout   DELETE /api/v1/categories/:id
  // !    : access  private

  exports.deleteCategory = factory.deleteOne(Category);