const { check } = require('express-validator')
const validatorMiddleware=require('../../middlewares/validatorMiddleware')

exports.getCategoryValidator = 
[
    check("id").isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware
]

exports.createCategoryValidator = 
[
check('name')
.notEmpty()
.withMessage('category required')
.isLength({min:3})
.withMessage('Too short category name')
.isLength({max:32})
.withMessage('Too short category name'),
validatorMiddleware,
]

exports.updateCategoryValidator = 
[

    check('name')
    .notEmpty()
    .withMessage('category required')
    .isLength({min:3})
    .withMessage('Too short category name')
    .isLength({max:32})
    .withMessage('Too short category name'),
validatorMiddleware
]


exports.deleteCategoryValidator = 
[
check("id").isMongoId().withMessage("Invalid category id format"),
validatorMiddleware
]
