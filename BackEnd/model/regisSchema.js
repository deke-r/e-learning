const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    fname: {
        type: 'string',
        required: true,
    },
    lname: {
        type: 'string',
        required: true,
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
    },
    pass: {
        type: 'string',
        required: true,
    },
    cpass: {
        type: 'string',
        required: true,
    },
    messages:[
{
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    phone:{
        type:'number',
        required:true,
    },
    message:{
        type:'String',
        required:true
    },
}
    ],
    tokens: [
        {
            token: {
                type: 'string',
                required: true,
            }
        }
    ]
});

// create hash password

userSchema.pre('save', async function (next) {
    if (this.isModified('pass')) {
        this.pass = await bcrypt.hash(this.pass, 12);
        this.cpass = await bcrypt.hash(this.cpass, 12)
    }
    next();
})


//create authentication token
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id },
            process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}

///Create Message Data-

userSchema.methods.addMessage=async function(name,email,phone,message){
    try{
        this.messages=this.messages.concat({name,email,phone,message});

        await this.save();
        return this.message;
    }catch(error){
        console.log(error);
    }
}




const userModel = mongoose.model('signup', userSchema)
module.exports = userModel