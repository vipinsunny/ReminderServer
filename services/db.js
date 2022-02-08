// //to connect Mongo db with server
const mongoose=require('mongoose')

// //connection string
mongoose.connect('mongodb://localhost:27017/ReminderServerdb', {
    useNewUrlParser:true
})

// //model creation
const User=mongoose.model('User',{
    userid:Number,
    name:String,
    password:String,
    
    
    event:[]
})

// //export model
module.exports={
    User
}