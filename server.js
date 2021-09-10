const express= require('express')
const path = require ('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const errorhandler= require ('errorhandler')
const dotenv= require ('dotenv');
const routes =require('./server/Routes/app')

dotenv.config();

const isProduction = process.env.NODE_ENV ==='production'


const app= express();


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

 if(!isProduction){
     app.use(errorhandler())
 }
app.use(routes)

// catch 404 and forward to error handler

app.use((req, res, next)=>{
    const err= new Error("Not found")
    err.status=404;
    next(err)
})


// error handlers

// development error Handler
// will print stacktrace

 if(!isProduction){
app.use((err, req, res, next)=>{
    console.log(err.stack)
    res.status(err.status || 500);
    res.json({
        error:{
            message:err.message,
            error:err
        }
    })

})
 }
// production error handler
// no stacktraces leaked to user

 app.use((err, req, res, next)=>{
     res.status(err.status || 500);
     res.json({
         error:{
             message:err.message,
             error:{}
         }
     })
 })


const PORT= process.env.PORT || '3000'
app.listen(PORT,()=>{
console.log(`Server is listening on port ${PORT}`)

})
module.exports=app;

