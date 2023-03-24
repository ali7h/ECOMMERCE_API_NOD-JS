const { check, body } = require('express-validator');
const slugify = require('slugify');
const validatorMiddleware=require('../../middlewares/validatorMiddleware')
const Category=require("../../models/categoryModel")
const SubCategory=require("../../models/subCategoryModel")


exports.getProductValidator = 
[
    check("id").isMongoId().withMessage("Invalid product id format"),
    validatorMiddleware
]

exports.createProductValidator = 
[
check('title')
.notEmpty()
.isLength({min:3})
.withMessage('product required')
.custom((val, { req }) => {
  req.body.slug = slugify(val);
  return true;
}),
check('description')
.isLength({max:1000})
.withMessage('Too long description'),
check('quantity')
.notEmpty()
.withMessage('product quantity required')
.isNumeric()
.withMessage('product quantity must be a number'),
check('sold')
.optional()
.isNumeric()
.withMessage('product quantity must be a number'),
check('price')
.notEmpty()
.withMessage('productv price is required')
.isNumeric()
.withMessage('product price must be number')
.isLength({max:32})
.withMessage('Too long price'),
check('priceAfterDiscount')
.optional()
.isNumeric()
.withMessage('productAfterDiscount must be a number')
.toFloat()
.custom((value,{req})=>{
if(req.body.price<=value){
    throw new Error('productAfterDiscount must be lower than price')
}
return true;
}),
check('colors')
.optional()
.isArray()
.withMessage('AvailableColors must be an array of string'),
check('imageCover')
.notEmpty()
.withMessage('product imageCover is required'),
check('image')
.optional()
.isArray()
.withMessage('images should be array of strings'),
check('category')
.notEmpty()
.withMessage('product must belong to a category')
.isMongoId()
.withMessage('invalid ID formate')

.custom((categoryId)=>
Category.findById(categoryId).then((category)=>{
if(!category){
    return Promise.reject(
        new Error(`No category for this id :${categoryId}`)
        )
}
})
),
check('subcategories')
.optional()
.isMongoId()
.withMessage('Invalid ID formate')

// TODO : check if the subcategories that is pass it are exists in subcategory database
.custom((subcategoriesIds) =>
  SubCategory.find({ _id: { $exists: true, $in: subcategoriesIds } }).then(
    (result) => {
      if (result.length < 1 || result.length !== subcategoriesIds.length) {
        return Promise.reject(new Error(`Invalid subcategories Ids`));
      }
    }
  )
)

// TODO : check if the subcategories that is pass it are belong to the original category 
.custom((val, { req }) =>
  SubCategory.find({ category: req.body.category }).then(
    (subcategories) => {
      const subCategoriesIdsInDB = [];
      subcategories.forEach((subCategory) => {
        subCategoriesIdsInDB.push(subCategory._id.toString());
      });
      // check if subcategories ids in db include subcategories in req.body (true)
      const checker = (target, arr) => target.every((v) => arr.includes(v));
      if (!checker(val, subCategoriesIdsInDB)) {
        return Promise.reject(
          new Error(`subcategories not belong to category`)
        );
      }
    }
  )
),
check('ratingsAverage')
.optional()
.isNumeric()
.withMessage('ratingsAverage must be a number')
.isLength({min:1})
.withMessage('ratingsAverage must be above or equal 1.0')
.isLength({max:5})
.withMessage('ratingsAverage must be below or equal 5.0'),
check('ratingsQuantity')
.optional()
.isNumeric()
.withMessage('ratingsQuantity must be a number'),
validatorMiddleware,
]

exports.updateProductValidator = 
[
check('id')
.isMongoId()
.withMessage('invalid Id formate'),
body('title')
.optional()
.custom((val, { req }) => {
  req.body.slug = slugify(val);
  return true;
}),
validatorMiddleware
]


exports.deleteProductValidator = 
[
check("id").isMongoId().withMessage("Invalid product id format"),
validatorMiddleware
]
