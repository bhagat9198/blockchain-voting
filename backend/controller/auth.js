// require("dotenv").config();
const User = require("./../modal/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const bycryptSaltRounds = Number(process.env.BYCRYPT_SALT_ROUNDS);
const bycryptSalt = Number(process.env.BYCRYPT_SALT);
const jwtSecret = Number(process.env.JWT_SECRET);

exports.postSignup = async (req, res, next) => {
  // console.log("postSignup :: req.body :: ", req.body);
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const userType = req.body.userType;
  const voteCardId = req.body.voteCardId;
  const createdAt = new Date().getTime();
  const isVerified = false;
  try {
    const dbRes = await User.find({ email });
    if (dbRes.length > 0) {
      return res.status(200).json({
        status: false,
        message: "User already present with same email",
      });
    }

    let hashedPwd;
    await bcrypt.hash(password, bycryptSaltRounds, (err, saltedPwd) => {
      console.log("saltedPwd :: ", saltedPwd);
      if (err) {
        console.log("err :: bcrypt.hash :: ", err.message);
        return
      }
      hashedPwd = saltedPwd;
    });
    const newUser = new User({
      name,
      email,
      userType,
      voteCardId,
      password: hashedPwd,
      createdAt,
      isVerified
    });

    const userSaved = await newUser.save();
    console.log('postSignup :: newUser :: ', newUser);
    console.log('postSignup :: userSaved :: ', userSaved);
    const token = await jwt.cookie('access_token', token).sign({
      userType: 'foobar',
      email,
      id: '',
    }, jwtSecret, { expiresIn: '1h' });
    console.log('postSignup :: token :: ', token);

    return res.status(201).json({
      message: "Success",
      status: true
    });

  } catch (error) {
    return res.status(400).json({
      message: "Error :: " + error.message,
      status: false
    });
  }

};

exports.postSignin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = User.find({ email });
    if (!user) {
      return res.status(200).json({
        message: "User doesnt exists with specfied email",
        status: false
      });
    }

    let isMatched = false;
    await bcrypt.compare(password, user.password, function (err, result) {
      console.log('postSignin :: bcrypt.compare :: result :: ', result);
      console.log('postSignin :: bcrypt.compare :: err :: ', err);
      if (err) {
        return;
      }
      isMatched = true
      // result == true
    });
    if (!isMatched) {
      return res.status(200).json({
        message: "Email or Password is wrong",
        status: false
      });
    }

    const token = await jwt.cookie('access_token', token).sign({
      userType: 'foobar',
      email,
      id: '',
    }, jwtSecret, { expiresIn: '1h' });
    console.log('postSignin :: token :: ', token);

    return res.setHeader({
      "authorization": token
    }).status(200).json({
      message: "Success",
    });
  } catch (error) {
    return res.status(200).json({
      message: "Error :: " + error.message,
      status: false
    });
  }
};

exports.postResetPassword = (req, res, next) => { };

exports.getLogout = (req, res, next) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully" });
};

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
