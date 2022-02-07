const Message = require('../models/db_models/Message');
const User = require('../models/db_models/User');


const BringAllUsers = async () => {
    try {
        //const user = await User.findOne({ uid });
        const users = await User.find({});
    
        return users;
        
    } catch (error) {
        console.log(error);
        return false;
    }
}

const LogOut = async(uid) => {

    try {
        
        await User.findOneAndUpdate({ _id: uid }, { online: false }, { new: true });

        return [{offline: true}]

    } catch (error) {
        console.log(error);
        return res.status(405).json({
            ok: false,
            msg: 'error set online to false'
        })
    }
}


const SendMessage = async(payload) => {
    const { myUid, friendUid, message} = payload;
    
    try {

        const newMessage = new Message({from: myUid, to: friendUid, message});
        const newMessageSaved = await newMessage.save();

        return newMessageSaved;
    } catch (error) {
        console.log('error sending message ', error);
    }
}

module.exports = {
    BringAllUsers,
    LogOut,
    SendMessage,
}