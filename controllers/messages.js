const Message = require('../models/db_models/Message');


const BringGroupMessages = async (req, res) => {

    try {
        const messages = await Message.find({ to: 'general-group'})

        res.json({
            messages
        });
    } catch (error) {
        console.log(error);
        return res.status(405).json({
            ok: false,
            msg: 'error bring all messages'
        })
    }
}


const BringIndividualUserMessages = async (req, res) => {

    const { friendUid, myUid } = req.body;

    try {
        //const user = await User.findOne({ uid });
        const messages = await Message.find({ 
            $or: [
                {from: myUid, to: friendUid},
                {to: myUid, from: friendUid,}

            ]
        }).sort({ createdAt: 'asc'})

        res.json({
            messages
        });
    } catch (error) {
        console.log(error);
        return res.status(405).json({
            ok: false,
            msg: 'error bring friend messages'
        })
    }
}


module.exports = {
    BringGroupMessages,
    BringIndividualUserMessages,
}
