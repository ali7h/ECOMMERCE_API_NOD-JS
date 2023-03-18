const slugify=require('slugify')                          //* it's replace spaces or invaild syntax to '-' char
const asysnchandler=require('express-async-handler')      //* it's handel the promse and error without catch block
const Brand = require('../models/brandModel')
const ApiError = require('../utils/ApiError')




//   TODO   :  create brand
// ? route? :  POST request
// ! access :  Privte

exports.createBrand=asysnchandler(async (req,res)=>{
    const name=req.body.name;
    const brand=await Brand.create({name,slug:slugify(name)})
    res.status(201).json({data:brand})
})




//   TODO   :  show Brands
// ? route? :  GET request from /api/v1/brands
// ! access :  Public

exports.getBrands=asysnchandler(async(req,res)=>{       
    const page  = req.query.page * 1  || 1                                     //*current page
    const limit = req.query.limit * 1 || 5                                    //*No.of document/page
    const skip = (page - 1) * limit                                          //*howmany document well skip it
    const brands = await Brand.find({}).skip(skip).limit(limit)
    res.status(201).json({result:brands.length,page,data:brands})
})



//   TODO   :  Show specific brand
// ? route? :  GET request from /api/v1/brands/:id
// ! access :  Public

exports.getBrand=asysnchandler(async(req,res,next)=>{
    const {id} = req.params;
    const brand = await Brand.findById(id)
    if(!brand){
        // res.status(404).json({msg:`No brand for this id ${id}`})
        return next(new ApiError(`No brand for this id ${id}`,404))
    }
    res.status(200).json({data:brand})
})




//   TODO   :  Update specific brand
// ? route? :  PUT request from /api/v1/brands/:id
// ! access :  Private

exports.updateBrand=asysnchandler(async(req,res)=>{
    const {id}   = req.params;
    const {name} = req.body

    const brand = await Brand.findOneAndUpdate(
        {_id:id},                               //TODO filteration : how i can get this brand 
        {name:name,slug:slugify(name)},         //TODO update      : which fileds will change
        {new:true}                              //TODO options     : return the brand after update
        )
        
    if(!brand){
        res.status(404).json({msg:`No brand for this id ${id}`})
    }
    res.status(200).json({data:brand})
})




//   TODO   :  Delete specific brand
// ? route? :  DELETE request from /api/v1/brands/:id
// ! access :  Private

exports.deleteBrand=asysnchandler(async(req,res)=>{
    const {id}   = req.params;
    const brand = await Brand.findOneAndDelete(id)
    if(!brand){
        res.status(404).json({msg:`No brand for this id ${id}`})
    }
    res.status(204).send()
})
