const SubCategory=require('../models/subCategoryModel')
const factory = require('./handlersFactory');


    // TODO : Nested route (Create)
exports.setCategoryIdToBody = (req, res, next) => {
    if (!req.body.category) req.body.category = req.params.categoryId;
    next();
  };
  

    // TODO Nested route (GET /api/v1/categories/:categoryId/subcategories)
  exports.createFilterObj = (req, res, next) => {
    let filterObject = {};
    if (req.params.categoryId) filterObject = { category: req.params.categoryId };
    req.filterObj = filterObject;
    next();
  };
  
  

  // TODO : desc    Get list of subcategories
  // ?    : route   GET /api/v1/subcategories
  // !    : access  Public

  exports.getSubCategories = factory.getAll(SubCategory);
  




  // TODO : desc    Get specific subcategory by id
  // ?    : rout   GET /api/v1/subcategories/:id
  // !    : access  Public

  exports.getSubCategory = factory.getOne(SubCategory);
  



  // TODO : desc    Create subCategory
  // ?    : rout   POST /api/v1/subcategories/
  // !    : access  private

  exports.createSubCategory = factory.createOne(SubCategory);
  




  // TODO : desc    Update specific subcategory
  // ?    : rout   PUT /api/v1/subcategories/:id
  // !    : access  private

  exports.updateSubCategory = factory.updateOne(SubCategory);




  // TODO : desc    Delete specific subCategory
  // ?    : rout   DELETE /api/v1/subcategories/:id
  // !    : access  private

  exports.deleteSubCategory = factory.deleteOne(SubCategory);



