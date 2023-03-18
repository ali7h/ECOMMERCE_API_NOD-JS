const slugify=require('slugify')                          //* it's replace spaces or invaild syntax to '-' char
const asysnchandler=require('express-async-handler')      //* it's handel the promse and error without catch block
const SubCategory=require('../models/subCategoryModel')
const ApiError = require('../utils/ApiError')


// TODO : use in nested route to pass categoryId
exports.setCategoryIdToBody = (req,res,next)=>{
    if(!req.body.category)
        req.body.category=req.params.categoryId;
    next()
}

// TODO : use in nested route to recive categoryId
exports.createFilterObj=(req,res,next)=>{
    filterObject={}
    if(req.params.categoryId)
        filterObject={category:req.params.categoryId}
        req.filterObj=filterObject
    next()
}



//   TODO   :  Create SubCategory
// ? route? :  POST request
// ! access :  Privte

exports.createSubCategory=asysnchandler(async (req,res)=>{
    const {name,category}=req.body;
    const subCategory=await SubCategory.create({name,slug:slugify(name),category})
    res.status(201).json({data:subCategory})
})



//   TODO   :  show subcategories
// ? route? :  GET request from /api/v1/subcategories
// ! access :  Public

exports.getSubCategories=asysnchandler(async(req,res)=>{       
    const page  = req.query.page * 1  || 1                                     //*current page
    const limit = req.query.limit * 1 || 5                                    //*No.of document/page
    const skip = (page - 1) * limit                                          //*howmany document well skip it

    const subcategories = await SubCategory.find(req.filterObj)
    .skip(skip)
    .limit(limit)
    // .populate({path:'category',select:'name -_id'})
    res.status(201).json({result:subcategories.length,page,data:subcategories})
})



//   TODO   :  Show specific Subcategory
// ? route? :  GET request from /api/v1/subcategories/:id
// ! access :  Public

exports.getSubCategory=asysnchandler(async(req,res,next)=>{
    const {id} = req.params;
    const subcategory = await SubCategory.findById(id)
    if(!subcategory){
        // res.status(404).json({msg:`No category for this id ${id}`})
        return next(new ApiError(`No category for this id ${id}`,404))
    }
    res.status(200).json({data:subcategory})
})




//   TODO   :  Update specific subcategory
// ? route? :  PUT request from /api/v1/categories/:id
// ! access :  Private

exports.updateSubCategory=asysnchandler(async(req,res)=>{
    const {id}   = req.params;
    const {name,category} = req.body

    const subcategory = await SubCategory.findOneAndUpdate(
        {_id:id},                                        //TODO filteration : how i can get this category 
        {name:name,slug:slugify(name),category},         //TODO update      : which fileds will change
        {new:true}                                       //TODO options     : return the category after update
        )
        
    if(!subcategory){
        res.status(404).json({msg:`No subcategory for this id ${id}`})
    }
    res.status(200).json({data:subcategory})
})




//   TODO   :  Delete specific subcategory
// ? route? :  DELETE request from /api/v1/categories/:id
// ! access :  Private

exports.deleteSubCategory=asysnchandler(async(req,res)=>{
    const {id}   = req.params;
    const subcategory = await SubCategory.findOneAndDelete(id)
    if(!subcategory){
        res.status(404).json({msg:`No subcategory for this id ${id}`})
    }
    res.status(204).send()
})



