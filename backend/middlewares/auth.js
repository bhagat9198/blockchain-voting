const jwt = require('jsonwebtoken');
const jwtSecret = Number(process.env.JWT_SECRET);

exports.authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, jwtSecret);
    req.userId = data.id;
    req.userType = data.userType;
    req.email = data.email;
    return next();
  } catch {
    return res.sendStatus(403);
  }

}