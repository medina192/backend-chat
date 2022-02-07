const { Router } = require('express');
const { validateToken } = require('../middlewares/validateToken');

const {
    CreateUser,
    Login,
    AuthWithToken,
    Logout
} = require('../controllers/auth');


const router = Router();

router.post('/createuser', CreateUser);
router.post('/login', Login);
router.post('/logout', Logout);
router.post('/authToken', validateToken, AuthWithToken);

module.exports = router;