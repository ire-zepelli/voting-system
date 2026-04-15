const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const TOKEN_EXPIRY = "12h";

function getTokenSecret() {
  if (!process.env.AUTH_TOKEN_SECRET) {
    throw new Error("AUTH_TOKEN_SECRET is missing.");
  }

  return process.env.AUTH_TOKEN_SECRET;
}

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function verifyPassword(password, passwordHash) {
  return bcrypt.compare(password, passwordHash);
}

function createToken(voter) {
  return jwt.sign(
    {
      sub: voter.id,
      studentId: voter.student_id,
    },
    getTokenSecret(),
    { expiresIn: TOKEN_EXPIRY }
  );
}

function decodeToken(token) {
  return jwt.verify(token, getTokenSecret());
}

module.exports = {
  createToken,
  decodeToken,
  hashPassword,
  verifyPassword,
};