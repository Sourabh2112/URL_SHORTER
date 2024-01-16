// const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const security = "sourabh@1234";

function setUser(user) {
  return jwt.sign({ _id: user._id, email: user.email }, security);
}

function getUser(token) {
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, security);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
