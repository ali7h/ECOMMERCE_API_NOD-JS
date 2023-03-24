const globelError = (err,req,res,next) => {      //* when you send 4 arguement express know this error handleing
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    if(process.env.NODE_ENV === 'development'){
        sendfErrorForDev(err,res)
    }
    else{
        sendfErrorForProd(err,res)
    }
}



// *in development mode you see all the detials
const sendfErrorForDev=(err,res)=>{
    res.status(err.statusCode).json({
        status:err.status,
        error:err,
        message:err.message,
        stack:err.stack,
    })
}


// *if you in production mode you don't need to see all details of error
const sendfErrorForProd=(err,res)=>{
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
    })
}


module.exports=globelError;