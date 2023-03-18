const { check } = require('express-validator')
const validatorMiddleware=require('../../middlewares/validatorMiddleware')

exports.getSubCategoryValidator = 
[
    check("id").isMongoId().withMessage("Invalid subcategory id format"),
    validatorMiddleware
]

exports.createSubsubCategoryValidator = 
[
check('name')
.notEmpty()
.withMessage('subcategory required')
.isLength({min:2})
.withMessage('Too short subcategory name')
.isLength({max:32})
.withMessage('Too short subcategory name'),
check('category').notEmpty().withMessage('subcategory must belong to category').
isMongoId().withMessage('Invalid category id format'),
validatorMiddleware,
]

exports.updateSubCategoryValidator = 
[
    check('name')
    .notEmpty()
    .withMessage('subcategory required')
    .isLength({min:2})
    .withMessage('Too short subcategory name')
    .isLength({max:32})
    .withMessage('Too short subcategory name'),
validatorMiddleware
]


exports.deleteSubCategoryValidator = 
[
check("id").isMongoId().withMessage("Invalid subcategory id format"),
validatorMiddleware
]
