const { check, body } = require('express-validator');
const slugify = require('slugify');
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
.withMessage('Too short category name')
.custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
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
    body('name')
    .optional()
    .custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
    }),
validatorMiddleware
]


exports.deleteCategoryValidator = 
[
check("id").isMongoId().withMessage("Invalid category id format"),
validatorMiddleware
]
