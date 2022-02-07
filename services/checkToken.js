const jwt = require('jsonwebtoken');

const checkToken = ( token = '') => {
    
    try {

        const { uid } = jwt.verify(token, process.env.PRIVATE_KEY);
        return [true, uid];

    } catch (error) {
        return [ false, null ];
    }

}

module.exports = {
    checkToken
}