const express=require('express')
// const subbrandRoute=require('./subbrandRoute')

const {
    getBrands,
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand
} = require('../services/brandService')



const {
    getBrandValidator,
    createBrandValidator,
    updateBrandValidator,
    deleteBrandValidator
} = require('../utils/validator/brandValidator')


const router=express.Router()

router.route('/').get(getBrands).post(createBrandValidator,createBrand)

router.route("/:id")
.get(getBrandValidator,getBrand)
.put(updateBrandValidator,updateBrand)
.delete(deleteBrandValidator,deleteBrand)


// router.use('/:brandId/subbrand',subbrandRoute) //!if the request like this go to subbrandRoute


module.exports=router