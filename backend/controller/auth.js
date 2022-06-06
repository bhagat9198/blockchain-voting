// require("dotenv").config();
const User = require("./../modal/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const AdminModal = require('./../modal/admin');
const UserModal = require('./../modal/user');

const bycryptSaltRounds = Number(process.env.BYCRYPT_SALT_ROUNDS);
const bycryptSalt = process.env.BYCRYPT_SALT;
const jwtSecret = process.env.JWT_SECRET;

exports.postSignup = async (req, res, next) => {
  // console.log("postSignup :: req.body :: ", req.body);
  console.log('postSignup :: bycryptSaltRounds :: ', bycryptSaltRounds);
  console.log('postSignup :: jwtSecret :: ', jwtSecret);

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

    let hashedPwd = await new Promise((resolve, reject) => {
      bcrypt.hash(password, bycryptSaltRounds, (err, saltedPwd) => {
        console.log("postSignup :: saltedPwd :: ", saltedPwd);
        if (err) {
          console.log("err :: bcrypt.hash :: ", err.message);
          // return res.status(400).json({
          //   message: "Error :: " + err.message,
          //   status: false
          // });
          reject(err)
        }
        // hashedPwd = saltedPwd;
        resolve(saltedPwd)
      });

    })

    const newUser = new User({
      name,
      email,
      userType,
      voteCardId,
      password: hashedPwd,
      createdAt,
      isVerified,
      hasVoted: false
    });

    const userSaved = await newUser.save();
    // console.log('postSignup :: newUser :: ', newUser);
    // console.log('postSignup :: userSaved :: ', userSaved);
    const token = await jwt.sign({
      userType: userType,
      email,
      id: userSaved?._id,
    }, jwtSecret);
    console.log('postSignup :: token :: ', token);

    res.setHeader(
      "x-access-token", `${token}`
    )
    return res.status(201).json({
      message: "Success",
      status: true,
      data: userSaved
    });

  } catch (error) {
    console.log('postSignup :: error :: ', error);
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
    const user = await User.find({ email });
    if (!user) {
      return res.status(200).json({
        message: "User doesnt exists with specfied email",
        status: false
      });
    }
    console.log('postSignin :: user :: ', user);
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

    const token = await jwt.sign({
      userType: user.userType,
      email,
      id: user._id,
    }, jwtSecret);
    console.log('postSignin :: token :: ', token);

    res.setHeader(
      "x-access-token", `${token}`
    )

    return res.status(200).json({
      message: "Success",
      data: user
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


exports.getAdminDetails = async(req, res, next) => {
  const _id = req.params.id;

  try {
    const admin = await AdminModal.findById(_id);
    console.log('auth :: getAdminDetails :: admin :: ', admin);
    if(!admin) {
      return res.json(400).json({
        message: 'No user with specifid id',
        status: false
      })
    }
    return res.status(200).json({
      status: true,
      data: admin,
      message: "Success",
    })
  } catch(error) {
    console.log('auth :: getAdminDetails :: error :: ', error);
    return res.json(400).json({
      message: error,
      status: false
    })
  }

}

exports.getUserDetails = async(req, res, next) => {
  const _id = req.params.id;
  try {
    const user = await UserModal.findById(_id);
    console.log('auth :: getUserDetails :: user :: ', user);
    if(!user) {
      return res.json(400).json({
        message: 'No user with specifid id',
        status: false
      })
    }
    return res.status(200).json({
      status: true,
      data: user,
      message: "Success",
    })
  } catch(error) {
    console.log('auth :: getUserDetails :: error :: ', error);
    return res.json(400).json({
      message: error,
      status: false
    })
  }
}

exports.patchUserDetails = async(req, res, next) => {
  console.log('auth :: patchUserDetails :: req.body :: ', req.body);
  console.log('auth :: patchUserDetails :: req.headers :: ', req.headers);
  const _id = req.params.id;
  const partyId = req.body.partyId;
  const blogId = req.body.blogId;
  const announcementId = req.body.announcementId;
  const donationId = req.body.donationId;
  const isVerified = req.body.isVerified;
  const hasVoted = req.body.hasVoted;

  try {
    let user = await UserModal.findById(_id);
    console.log('auth :: patchUserDetails :: user :: ', user);
    if(!user) {
      return res.json(400).json({
        message: 'No user with specifid id',
        status: false
      })
    }

    if (partyId) {
      user.partyId = `${partyId}`;
    }
    if (hasVoted) {
      user.hasVoted = Boolean(hasVoted);
    }
    if (isVerified) {
      user.isVerified = Boolean(isVerified);
    }
    if (partyId) {
      user.partyId = `${partyId}`;
    }
    if (blogId) {
      user.blogs.unshift(blogId);
    }
    if (announcementId) {
      user.announcements.unshift(announcementId);
    }
    if (donationId) {
      user.donations.unshift(donationId);
    }

    console.log('auth :: patchUserDetails :: user :: ', user);
    let savedUserData = await user.save();
    return res.status(200).json({
      status: true,
      data: savedUserData,
      message: "Success",
    })

  } catch(error) {
    console.log('auth :: patchUserDetails :: error :: ', error);
    return res.json(400).json({
      message: error,
      status: false
    })
  }
}

exports.patchAdminDetails = async(req, res, next) => {
  const _id = req.params.id;
  const partyId = req.body.partyId;
  const blogId = req.body.blogId;
  const announcementId = req.body.announcementId;
  const donationId = req.body.donationId;
  const isVerified = req.body.isVerified;
  const hasVoted = req.body.hasVoted;

  try {
    const user = await AdminModal.findById(_id);
    console.log('auth :: patchAdminDetails :: user :: ', user);
    if(!user) {
      return res.json(400).json({
        message: 'No admin with specifid id',
        status: false
      })
    }
    if (partyId) {
      user.partyId = `${partyId}`;
    }
    if (hasVoted) {
      user.hasVoted = Boolean(hasVoted);
    }
    if (isVerified) {
      user.isVerified = Boolean(isVerified);
    }
    if (partyId) {
      user.partyId = `${partyId}`;
    }
    if (blogId) {
      user.blogs.unshift(blogId);
    }
    if (announcementId) {
      user.announcements.unshift(announcementId);
    }
    if (donationId) {
      user.donations.unshift(donationId);
    }

    console.log('auth :: patchUserDetails :: user :: ', user);
    let savedUserData = await user.save();

    return res.status(200).json({
      status: true,
      data: savedUserData,
      message: "Success",
    })

  } catch(error) {
    console.log('auth :: patchAdminDetails :: error :: ', error);
    return res.json(400).json({
      message: error,
      status: false
    })
  }
}

exports.postGenerateToken = async(req, res, next) => {
  console.log('auth :: postGenerateToken :: req.body :: ', req.body);
  const userType = req.body.userType;
  const email = req.body.email;
  const _id = req.body._id;

  const token = await jwt.sign({
    _id,
    userType,
    email,
  }, jwtSecret);
  console.log('auth :: postGenerateToken :: token :: ', token);

  res.setHeader(
    "x-access-token", `${token}`
  )

  return res.status(201).json({
    message: "Success",
    status: true,
    data: {
      token
    }
  });

}