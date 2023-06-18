const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');



// Schema import--------------->
var User = require('../model/regisSchema');
// var Contact = require('../model/contactSchema');

var Add = require('../model/addSchema');
var Addcourse = require('../model/addCourseSchema');
var Addcv = require('../model/addCvSchema');

const Authenticate = require('../middleware/authenticate')



// --------------->  Schema import



router.get('/', function (req, res) {
    res.write('<h1>Hello Deker</h1>');
})


// Register ----------------------------------->

router.post('/signup', async (req, res) => {
    const { fname, lname, email, pass, cpass } = req.body;

    if (!fname || !lname || !email || !pass || !cpass) {
        return res.status(422).json({ error: 'plz fill all fields' });
    }

    try {
        const useExist = await User.findOne({ email: email })
        if (useExist) {
            return res.status(422).json({ error: 'email already exist' });
        }
        else if (pass != cpass) {
            return res.status(422).json({ error: 'pass are not matched' });
        }

        const user = new User({ fname, lname, email, pass, cpass });

        const userregister = await user.save();
        if (userregister) {
            res.status(201).json({ message: 'user registered sucessfully' });
        }
    } catch (err) {
        console.log(err);
    }
});


//  --------------------------------->  Register



// Login ---------------------------------> 


router.post('/login', async (req, res) => {

    try {

        const { email, pass } = req.body;

        if (!email || !pass) {

            return res.status(400).json({ error: "Please fill the data" })

        }

        const userLogin = await User.findOne({ email: email });

        if (userLogin) {

            const isMatch = await bcrypt.compare(pass, userLogin.pass); 

            const token=await userLogin.generateAuthToken()
            console.log(token);
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+60000),
                httpOnly:true
            })

            if (!isMatch) {

                res.json({ error: "invalid credentials" });

            }

            else {

                res.json({ message: "user sign  successfully" });

            }

        }

        else {

            res.join({ error: "invalid credentials" })

        }

    }

    catch (err) {

        console.log(err);

    }

});





// router.post('/login', async (req, res) => {
//     try {

//         const { email, pass } = req.body;
//         if (!email || !pass) {
//             return res.status(400).json({ error: 'plz fill the data' })
//         }


//         const userLogin = await User.findOne({ email: email });
//         // console.log(userLogin)
//         if (userLogin) {
//             const isMatch = await bcrypt.compare(pass, userLogin.pass);

//             const token = await userLogin.generateAuthToken()
//              console.log(token);
//             res.cookie = ("jwtoken", token, {
//                 expires: new Date(Date.now() + 60000),
//                 httpOnly: true
//             })

//             if (!isMatch) {
//                 res.json({ error: 'invalid credentails' });
//             }
//             else {
//                 res.json({ message: 'user signin sucessfully' });
//             }
//         }
//         else {
//             res.join({ error: 'invalid credentails' });
//         }
//     }
//     catch (err) {
//         console.log(err);
//     }

// });
//  --------------------------------->  Login




// Contact ------------------------------->
router.get('/')


router.post('/contact',Authenticate, async (req, res) => {
    
    try {

        const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
        return res.status(422).json({ error: 'plz fill all fields' });
    }

    const userContact=await User.findOne({_id:req.userID});
    if(userContact){
        const usermessage=await userContact.addMessage(name,email,phone,message)
        await userContact.save();
        res.status(201).json({message:'user contact sucessfully'})
    }


        // const user = new Contact({ name, email, phone, message });

        // const userregister = await user.save();
        // if (userregister) {
        //     res.status(201).json({ message: 'user registered sucessfully' });
        // }
    } catch (err) {
        console.log(err);
    }
})





// ------------------------------->  Contact 


// Add User ------------------------------->  

router.post('/adduser', async (req, res) => {
    const { id, name, email, number, age, date, image, address, inlineRadioOptions } = req.body;
    if (!name || !email || !number) {
        return res.status(422).json({ error: 'plz fill all fields' });
    }
    try {
        const user = new Add({ id, name, email, number, age, date, image, address, inlineRadioOptions });

        const userregister = await user.save();
        if (userregister) {
            res.status(201).json({ message: 'user registered sucessfully' });
        }
    } catch (err) {
        console.log(err);
    }
})

// ------------------------------->  Add User

// Add Course ------------------------------->  
router.post('/addcourse', async (req, res) => {
    const { id, name, fees } = req.body;
    if (!name) {
        return res.status(422).json({ error: 'plz fill all fields' });
    }
    try {
        const user = new Addcourse({ id, name, fees });

        const userregister = await user.save();
        if (userregister) {
            res.status(201).json({ message: 'user registered sucessfully' });
        }
    } catch (err) {
        console.log(err);
    }
})

// ------------------------------->  Add Course 

// Add Course Video ------------------------------->  
router.post('/addcv', async (req, res) => {
    const { id, name, cid, duration } = req.body;
    if (!name) {
        return res.status(422).json({ error: 'plz fill all fields' });
    }
    try {
        const user = new Addcv({ id, name, cid, duration });

        const userregister = await user.save();
        if (userregister) {
            res.status(201).json({ message: 'user registered sucessfully' });
        }
    } catch (err) {
        console.log(err);
    }
})
// ------------------------------->  Add Course Video


// Authenticate User ------------------------------->  

router.get('/userprofile', Authenticate, (req, res) => {
    console.log('user profile')
    res.send(req.rootUser);
});


// ------------------------------->  Authenticate User








module.exports = router;