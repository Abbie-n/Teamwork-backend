const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (request, response, next) => {
  const token = request.headers['x-access-token'] || request.headers.authorization;
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, process.env.TOKEN, (error, decoded) => {
      if (error) {
        return response.status(403).json({
          status: 'Access Denied!',
          message: 'Invalid Token!'
        });
      } else {
        request.decoded = decoded;
        next();
      }
    });
  } else {
    return response.status(403).json({
      status: "Access denied!",
      message: 'No access Token!'
    });
  }
};

module.exports = { auth }