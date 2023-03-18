const slugify=require('slugify')                          //* it's replace spaces or invaild syntax to '-' char
const asysnchandler=require('express-async-handler')      //* it's handel the promse and error without catch block
const Category=require('../models/categoryModel')
const ApiError = require('../utils/ApiError')




//   TODO   :  create category
// ? route? :  POST request
// ! access :  Privte


exports.createCategory=asysnchandler(async (req,res)=>{
    const name=req.body.name;
    const category=await Category.create({name,slug:slugify(name)})
    res.status(201).json({data:category})
})



//   TODO   :  show categories
// ? route? :  GET request from /api/v1/categories
// ! access :  Public

exports.getCategories=asysnchandler(async(req,res)=>{       
    const page  = req.query.page * 1  || 1                                  //*current page
    const limit = req.query.limit * 1 || 5                                  //*No.of document/page
    const skip = (page - 1) * limit                                         //*how many document well skip it
    const categories = await Category.find({}).skip(skip).limit(limit)
    res.status(201).json({result:categories.length,page,data:categories})
})



//   TODO   :  Show specific category
// ? route? :  GET request from /api/v1/categories/:id
// ! access :  Public

exports.getCategory=asysnchandler(async(req,res,next)=>{
    const {id} = req.params;
    const category = await Category.findById(id)
    if(!category){
        // res.status(404).json({msg:`No category for this id ${id}`})
        return next(new ApiError(`No category for this id ${id}`,404))
    }
    res.status(200).json({data:category})
})



//   TODO   :  Update specific category
// ? route? :  PUT request from /api/v1/categories/:id
// ! access :  Private

exports.updateCategory=asysnchandler(async(req,res,next)=>{
    const {id}   = req.params;
    const {name} = req.body

    const category = await Category.findOneAndUpdate(
        {_id:id},                               //TODO filteration : how i can get this category 
        {name:name,slug:slugify(name)},         //TODO update      : which fileds will change
        {new:true}                              //TODO options     : return the category after update
        )
        
    if(!category){
        // res.status(404).json({msg:`No category for this id ${id}`})
        return next(new ApiError(`No category for this id ${id}`,404))

    }
    res.status(200).json({data:category})
})




//   TODO   :  Delete specific category
// ? route? :  DELETE request from /api/v1/categories/:id
// ! access :  Private

exports.deleteCategory=asysnchandler(async(req,res,next)=>{
    const {id}   = req.params;
    const category = await Category.findOneAndDelete(id)
    if(!category){
        // res.status(404).json({msg:`No category for this id ${id}`})
        return next(new ApiError(`No category for this id ${id}`,404))
    }
    res.status(204).send()
})
