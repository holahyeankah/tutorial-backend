const express= require('express')
const path = require ('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const errorhandler= require ('errorhandler')
const dotenv= require ('dotenv');
const routes =require('./server/Routes/app')

dotenv.config();





const app= express()


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(routes)




const PORT= process.env.PORT || '3000'
app.listen(PORT,()=>{
console.log(`Server is listening on port ${PORT}`)

})
module.exports=app;

