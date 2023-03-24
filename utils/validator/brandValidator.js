const { check, body } = require('express-validator');
const slugify = require('slugify');
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
.isLength({min:2})
.withMessage('Too short brand name')
.isLength({max:32})
.withMessage('Too short brand name')
.custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
validatorMiddleware,
]

exports.updateBrandValidator = 
[
  check('id').isMongoId().withMessage('Invalid Brand id format'),
  body('name')
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
]


exports.deleteBrandValidator = 
[
check("id").isMongoId().withMessage("Invalid brand id format"),
validatorMiddleware
]
