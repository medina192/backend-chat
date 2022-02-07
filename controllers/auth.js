
const User = require('../models/db_models/User');
const bcrypt = require('bcrypt');

const { createToken } = require('../services/generateToken');

// return res.status without 'return', gives the next error: Cannot set headers after they are 
// sent to the client

const saltRounds = 10;

const CreateUser = async( req, res ) => {

    const { name, password, email } = req.body;


    try {
        const userExists = await User.findOne({ email });
        
        if(userExists)
        {
            return res.status(400).json({
                msg: 'The email already exists'
            })
        }

        const hash = bcrypt.hashSync(password, saltRounds);

        const newUser = new User({
            name,
            email,
            password: hash
        })


        const user = await newUser.save();

        const token = createToken(newUser.id);

         res.json({
            user,
            token
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk with the administer'
        })
    }

}


const Login = async(req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        
        if(!user)
        {
            return res.status(400).json({
                msg: 'The Email is not register'
            })
        }

        const hash = bcrypt.hashSync(password, saltRounds);

        if( bcrypt.compareSync( hash, user.password) ) // the order matters
        {
            return res.status(401).json({
                message: "El email o contraseña son incorrectos"
            })
        }

        await User.findOneAndUpdate({email}, { online: true }, { new: true });

        const token = createToken(user.id);
        res.json({
            token,
            user
        });


    } catch (error) {
        console.log(error);
        return res.status(405).json({
            ok: false,
            msg: 'El email o contraseña son incorrectos and update online'
        })
    }
}








const AuthWithToken = async(req, res) => {

    const uid = req.uid;

    try {
        //const user = await User.findOne({ uid });
        const user = await User.findOneAndUpdate({_id: uid}, { online: true }, { new: true })
        res.json({
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(405).json({
            ok: false,
            msg: 'error getting user with token'
        })
    }

}


const Logout = async(req, res) => {

    const uid = req.body.userId;

    try {
        
        await User.findOneAndUpdate({ _id: uid }, { online: false }, { new: true });
        
        res.json({
            ok: true
        })

    } catch (error) {
        console.log(error);
        return res.status(405).json({
            ok: false,
            msg: 'error set online to false'
        })
    }
}


module.exports = {
    CreateUser,
    Login,
    AuthWithToken,
    Logout
}