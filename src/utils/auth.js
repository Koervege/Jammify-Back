const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error('Session expired');
    }

    const [_, token] = authorization.split(' ');

    if (!token) {
      throw new Error('Session expired');
    }

    const { username, email } = jwt.verify(token, process.env.SECRET);

    req.username = username;
    req.email = email;

    
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
