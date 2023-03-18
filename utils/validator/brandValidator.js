const { check } = require('express-validator')
const validatorMiddleware=require('../../middlewares/validatorMiddleware')

exports.getBrandValidator = 
[
    check("id").isMongoId().withMessage("Invalid brand id format"),
    validatorMiddleware
]

exports.createBrandValidator = 
[
check('name')
.notEmpty()
.withMessage('brand required')
.isLength({min:3})
.withMessage('Too short brand name')
.isLength({max:32})
.withMessage('Too short brand name'),
validatorMiddleware,
]

exports.updateBrandValidator = 
[

    check('name')
    .notEmpty()
    .withMessage('brand required')
    .isLength({min:3})
    .withMessage('Too short brand name')
    .isLength({max:32})
    .withMessage('Too short brand name'),
validatorMiddleware
]


exports.deleteBrandValidator = 
[
check("id").isMongoId().withMessage("Invalid brand id format"),
validatorMiddleware
]
