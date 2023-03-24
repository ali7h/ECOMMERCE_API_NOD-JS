const express=require('express');
const dbConnection=require('./config/database')
const morgan=require("morgan")

// TODO use dotenv to access to the config.env file
const dotenv=require('dotenv')
dotenv.config({path:"config.env"})

const categoryRoute=require('./routes/categoryRoute')
const subCategoryRoute=require('./routes/subCategoryRoute')
const brandRoute=require('./routes/brandRoute')
const productRoute=require('./routes/productRoute')


const ApiError=require('./utils/ApiError')
const globelError = require('./middlewares/errorMiddleware')


const app=express()



//*connect with mongoDb
dbConnection()



//Middlewares
app.use(express.json())
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
    console.log(`mode: ${process.env.NODE_ENV}`)
}


//TODO : Mount Routes
app.use('/api/v1/categories',categoryRoute)
app.use('/api/v1/subcategories',subCategoryRoute)
app.use('/api/v1/brands',brandRoute)
app.use('/api/v1/products',productRoute)



app.all("*",(req,res,next)=>{           //! "*" mean any route not found

//TODO : create error and send it to error handleing meddleware

    next(new ApiError(`can't find this route: ${req.originalUrl}`,400))
})


//!Globel error handleing middelware for express
app.use(globelError)


const PORT=process.env.PORT || 8000;
const server = app.listen(PORT,()=>{
    console.log(`app running  on port ${PORT} http://localhost:${PORT}`)
})



//!handle rejection any error maybe happen outside express (like no connection with datebase) 
process.on("unhandledRejection",(err)=>{
    console.error(`unhandledRejection error: ${err.name} | ${err.message}`)
    server.close(()=>{
        console.error(`Shutting down....`)
        process.exit(1)
    })
})