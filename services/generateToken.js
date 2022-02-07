const jwt = require('jsonwebtoken');

// RS256 returns error reason: 'no start line',
// The RSA version requires a public and private key (Public for verification and 
// private for signing)

const createToken = ( uid ) => {
    try {

        //const token = jwt.sign({ uid, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 3), }, // 1 minute
        const token = jwt.sign({ uid },  
        process.env.PRIVATE_KEY, { algorithm: 'HS256'});
        
        return token;

    } catch (error) {
        console.log('error gt', error);
        return false;
    }

}

module.exports = {
    createToken
}