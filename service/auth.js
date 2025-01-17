const jwt = require('jsonwebtoken');
const secret = 'vraj';

function setUser(user) {

  return jwt.sign({
    _id: user.id,
    email: user.email,
  }, secret);
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.error('Invalid token:', err.message);
    return null;
  }
}


module.exports = {
  setUser,
  getUser,
};
