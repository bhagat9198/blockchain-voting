const jwt = require('jsonwebtoken');
const jwtSecret = Number(process.env.JWT_SECRET);

exports.authorization = (req, res, next) => {
  // const token = req.cookies.access_token;
  const header = req.headers['authorization'];
  // if (!token) {
  //   return res.sendStatus(403);
  // }
  let token;
  if (header === undefined) {
    return res.sendStatus(403);
  } else {
    const bearer = header.split(' ');
    token = bearer[1];
  }
  try {
    const data = jwt.verify(token, jwtSecret);
    console.log('authorization :: data :: ', data);
    req.userId = data.id;
    req.userType = data.userType;
    req.email = data.email;
    return next();
  } catch {
    return res.sendStatus(403);
  }

}