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
    
    cid:{
        type:'string',
        
    },
    duration:{
        type:'string',
        
    },
});


const userModel = mongoose.model('addCv', userSchema)
module.exports = userModel