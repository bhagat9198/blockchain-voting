const bcrypt = require("bcrypt");

const User = require('./../modal/user');
const Vote = require('./../modal/vote');
const Admin = require('./../modal/admin');

const bycryptSaltRounds = Number(process.env.BYCRYPT_SALT_ROUNDS);

exports.postVerify = (req, res, next) => {
  const id = req.params.id;

  User.findById(id).then(async (user) => {
    if (!user) {
      return res.status(200).json({
        message: 'No User found',
        status: false
      })
    }

    user.isVerified = true;

    const userUpdated = user.update();
    console.log('postVerify :: userUpdated :: ', userUpdated);
    return res.status(200).json({
      message: 'Success',
      status: true,
    })
  }).catch(error => {
    return res.status(200).json({
      message: 'Errpr :: ' + error.message,
      status: false
    })
  })
}


exports.getLatestVotesEachday = (req, res, next) => {
  return res.status(200).json({
    message: 'Success'
  })
}

exports.getEachPartyVotes = (req, res, next) => {
  return res.status(200).json({
    message: 'Success'
  })
}

exports.getAllAdmins = (req, res, next) => {
  Admin.find().then(admins => {
    if (!admins) {
      return res.status(200).json({
        message: 'No admins found',
        status: false
      })
    }
    return res.status(200).json({
      message: 'Success',
      status: true,
      data: {
        admins
      }
    })
  }).catch(error => {
    return res.status(400).json({
      message: `Error: ${error.message}`,
      status: false
    })
  })

}

exports.postAddAdmin = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const createdAt = new Date().getTime();

  let hashedPwd = await new Promise((resolve, reject) => {
    bcrypt.hash(password, bycryptSaltRounds, (err, saltedPwd) => {
      console.log("saltedPwd :: ", saltedPwd);
      if (err) {
        console.log("err :: bcrypt.hash :: ", err.message);
        return res.status(400).json({
          message: `Error :: ${err.message}`,
          status: false
        })
      }
      // hashedPwd = saltedPwd;
      resolve(saltedPwd)
    });

  })


  const newAdmin = new Admin({
    name,
    email,
    password: hashedPwd,
    blogs: [],
    announcements: [],
    donations: [],
    createdAt,
    createdBy: 'admin'
  });

  try {
    const savedAdmin = await newAdmin.save();
    console.log('postAddAdmins :: savedAdmin :: ', savedAdmin);
    return res.status(201).json({
      message: 'Success',
      status: true,
      data: savedAdmin
    })
  } catch (error) {
    return res.status(400).json({
      message: `Error :: ${error.message}`,
      status: false
    })
  }
}

exports.deleteAddAdmins = async (req, res, next) => {
  const id = req.params.id;

  try {
    await Admin.findByIdAndDelete(id)
    return res.status(200).json({
      message: 'Success',
      status: true
    })
  } catch (error) {
    return res.status(200).json({
      message: `Error :: ${error.message}`,
      status: false
    })
  }
}
