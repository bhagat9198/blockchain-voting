const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

exports.adminAuthorization = (req, res, next) => {
  const header = req.headers['authorization'];
  console.log('middlewares :: auth :: header :: ', header);
  console.log('middlewares :: auth :: req.headers :: ', req.headers);
  const result = checkAuthorization({ uType: 'admin', header });
  console.log('middlewares :: auth :: ', result);
  if (!result.status) {
    return res.json(401).json({
      status: res.status,
      message: res.message
    })
  }
  res.locals._id = result._id;
  res.locals.userType = result.userType;
  res.locals.email = result.email;
  next();
}

exports.electionPartyAuthorization = (req, res, next) => {
  const header = req.headers['authorization'];
  const result = checkAuthorization({ uType: 'electionParty', header });
  console.log('middlewares :: electionPartyAuthorization :: result :: ', result);
  if (!result.status) {
    return res.json(401).json({
      status: res.status,
      message: res.message
    })
  }
  res.locals._id = result._id;
  res.locals.userType = result.userType;
  res.locals.email = result.email;
  next();
}

exports.voterAuthorization = (req, res, next) => {
  const header = req.headers['authorization'];
  const result = checkAuthorization({ uType: 'voter', header });
  console.log('middlewares :: voterAuthorization :: result :: ', result);
  if (!result.status) {
    return res.json(401).json({
      status: res.status,
      message: res.message
    })
  }
  res.locals._id = result._id;
  res.locals.userType = result.userType;
  res.locals.email = result.email;
  next();
}

////////////////////////////////////////////////////////////////////////////////////////


function checkAuthorization({ uType, header }) {
  console.log('middlewares :: checkAuthorization :: header :: ', header);
  let token;
  if (header === undefined) {
    return {
      status: false,
      message: 'Not a valid user. Please login Again'
    }
  }
  token = header;
  try {
    const data = jwt.verify(token, jwtSecret);
    console.log('middlewares :: checkAuthorization :: :: data :: ', data);
    const _id = data._id;
    const userType = data.userType;
    const email = data.email;
    // console.log('middlewares :: checkAuthorization :: :: userType  :: uType ::', userType, uType, userType.toLowerCase() !== uType);
    if (userType.toLowerCase() !== uType.toLowerCase()) {
      return {
        status: false,
        message: 'You are not authorized to access this page'
      }
    } else {
      return {
        status: true,
        _id, userType, email
      }
    }
  } catch (error) {
    console.log('middlewares :: checkAuthorization :: error :: ', error);
    return {
      status: false,
      message: error.message
    }
  }
}