const jwt = require('jsonwebtoken');

/*
    invalid toke: JsonWebTokenError

    expired token: TokenExpiredError, expiredAt: 2022-01-05T01:44:47.000Z

    JsonWebTokenError: jwt malformed: token must be send with authorization bearer


*/

/*

const config = {
    headers: { Authorization: `Bearer ${token}` }
};

const bodyParameters = {
   key: "value"
};

Axios.post( 
  'http://localhost:8000/api/v1/get_token_payloads',
  bodyParameters,
  config
).then(console.log).catch(console.log);

*/

const validateToken = async(req, res, next) => {

    try {

        
        //const token = req.header('x-token');
        const bearerToken = req.headers.authorization.split(' ');
        //console.log('bearer', bearerToken[1])
        if(!bearerToken[1])
        {
            return res.status(400).json({
                message: 'No existe el token'
            })
        }

        const token = bearerToken[1];

        //console.log('tokeeeeen', bearerToken[1], 'jejeje');

        const { uid } = jwt.verify(token, process.env.PRIVATE_KEY);
        // error: TokenExpiredError: jwt expired
        req.uid = uid;

        next();
        
    } catch ( error ) {
        console.log('error malformed--', error);
        return res.status(400).json({
            message: 'Error validando el token'
        });

        /*
        if( error.slice(0, 29) == 'TokenExpiredError: jwt expired' )
        {
            console.log('token expired');
        }

        return res.status(400).json({
            message: 'Error validando el token'
        });
        */
    }
}

module.exports = {
    validateToken
}