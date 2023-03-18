const {param,validationResult} = require('express-validator')

const validatorMiddleware=(req,res,next)=>{
    //TODO : Finds the vaildation errors in this request and wraps them in an object with handle functions
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    next();
}

module.exports=validatorMiddleware;

