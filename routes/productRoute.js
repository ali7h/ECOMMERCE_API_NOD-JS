const express=require('express')

const router = express.Router()

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../services/productService')


const {
    getProductValidator,
    createProductValidator,
    updateProductValidator,
    deleteProductValidator
} = require('../utils/validator/productValidator')


router.route('/').get(getProducts).post(createProductValidator,createProduct)

router.route("/:id")
.get(getProductValidator,getProduct)
.put(updateProductValidator,updateProduct)
.delete(deleteProductValidator,deleteProduct)


// // todo : if the request was on "/:categoryId/subcategories" go to subcategoryRoute
// router.use('/:categoryId/subcategories',subcategoriesRoute)


module.exports=router
