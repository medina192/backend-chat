

const { Router } = require('express');
const { validateToken } = require('../middlewares/validateToken');


const {
    BringGroupMessages,
    BringIndividualUserMessages
} = require('../controllers/messages');

const router = Router();

router.post('/bringAllMessages', validateToken, BringGroupMessages);
router.post('/bringFriendMessages', BringIndividualUserMessages);


module.exports = router;