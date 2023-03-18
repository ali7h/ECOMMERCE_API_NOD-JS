const express=require('express')
const subcategoriesRoute=require('./subCategoryRoute')

const router = express.Router()

const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../services/categoryService')


const {
    getCategoryValidator,
    createCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator
} = require('../utils/validator/categoryValidator')


router.route('/').get(getCategories).post(createCategoryValidator,createCategory)

router.route("/:id")
.get(getCategoryValidator,getCategory)
.put(updateCategoryValidator,updateCategory)
.delete(deleteCategoryValidator,deleteCategory)


// todo : if the request was on "/:categoryId/subcategories" go to subcategoryRoute
router.use('/:categoryId/subcategories',subcategoriesRoute)


module.exports=router
