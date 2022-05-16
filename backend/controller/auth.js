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
    res;

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

exports.postSignin = (req, res, next) => {
  return res.status(200).json({
    message: "Success",
  });
};

exports.postResetPassword = (req, res, next) => { };

exports.getLogout = (req, res, next) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully" });
};
