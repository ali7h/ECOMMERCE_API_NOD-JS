const express=require('express')

const {
    createSubCategory,
    deleteSubCategory,
    getSubCategory,
    getSubCategories,
    updateSubCategory,
    setCategoryIdToBody,
    createFilterObj,
} = require('../services/subCategoryService')

const {
    createSubsubCategoryValidator,
    deleteSubCategoryValidator,
    getSubCategoryValidator,
    updateSubCategoryValidator
} = require('../utils/validator/subCategoryValidator')


// TODO : mergeParams allow us to access paramerters on other routers
// * ex:we need to access categoryId from category route
const router=express.Router({mergeParams:true})


router.route('/').post(setCategoryIdToBody,createSubsubCategoryValidator,createSubCategory).get(createFilterObj,getSubCategories)
router.route('/:id').get(getSubCategoryValidator,getSubCategory).put(updateSubCategoryValidator,updateSubCategory).delete(deleteSubCategoryValidator,deleteSubCategory)

module.exports=router
