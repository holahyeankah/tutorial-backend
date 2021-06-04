const express= require('express')
const path = require ('path')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config();
const app= express();


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
const tutorial= require('./server/routes/Tutorial')
const user= require('./server/routes/User')



app.use('/', tutorial)
app.use('/', user)




const PORT= process.env.PORT || '3000'
app.listen(PORT,()=>{
console.log(`Server is listening on port ${PORT}`)

})
module.exports=app;

