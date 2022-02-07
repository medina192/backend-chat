const jwt = require('jsonwebtoken');

const createToken = () => {
    const token = jwt.sign({ foo: 'bar' }, process.env.PRIVATE_KEY, { algorithm: 'RS256'});
}