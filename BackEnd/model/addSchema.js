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
    email:{
        type:'string',
        required:true,
    },
    number:{
        type:'number',
        required:true,
        unique:true,
    },
    age:{
        type:'number',
        required:true,
        // unique:true,
    },
    date:{
        type:'date',
        // required:true,
    },
    image:{
        type:'string',
        // required:true,
    },
    address:{
        type:'string',
        // required:true,
    },
    inlineRadioOptions:{
        type:'string',
        // required:true,
    }
});


const userModel = mongoose.model('addUser', userSchema)
module.exports = userModel