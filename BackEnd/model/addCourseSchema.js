const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    id:{
        type:'number',
        // required:true,
        // unique:true,
    },
    name:{
        type:'string',
        required:true,
    },
    
    fees:{
        type:'string',
        required:true,
        unique:true,
    },
});


const userModel = mongoose.model('addCourse', userSchema)
module.exports = userModel