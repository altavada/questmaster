const { verify, sign } = require("jsonwebtoken");

const secret = "hushhush";
const expiration = "2h";

module.exports = {
  authMiddleware: ({ req }) => {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    return req;
  },
  signToken: ({ name, email, _id, isAdmin }) => {
    const payload = { name, email, _id, isAdmin };

    return sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
