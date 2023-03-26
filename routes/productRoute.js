const express=require('express')

const router = express.Router()

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImages,
    resizeProductImages,
} = require('../services/productService')


const {
    getProductValidator,
    createProductValidator,
    updateProductValidator,
    deleteProductValidator
} = require('../utils/validator/productValidator')


router.route('/').get(getProducts)
.post(
    uploadProductImages,
    resizeProductImages,
    createProductValidator,
    createProduct,
    )

router.route("/:id")
.get(getProductValidator,getProduct)
.put(uploadProductImages,resizeProductImages,updateProductValidator,updateProduct)
.delete(deleteProductValidator,deleteProduct)



module.exports=router
