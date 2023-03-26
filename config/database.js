const mongoose = require('mongoose');

const dbConnection=()=>{
mongoose.connect(process.env.DB_URL)
.then( result => {
      console.log(`database connected: ${result.connection.host}`)
})

}

module.exports=dbConnection