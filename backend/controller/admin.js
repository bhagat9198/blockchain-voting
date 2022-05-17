const UserTemp = require('./../modal/userTemp');
const User = require('./../modal/user');
const Vote = require('./../modal/vote');
const Admin = require('./../modal/admin');

exports.postVerify = (req, res, next) => {
  const id = req.params.id;

  UserTemp.findById(id).then(user => {
    if(!user) {
      return res.status(200).json({
        message: 'No User found',
        status: false
      })

    } 
    const newUser = new User({
      ...user,
      blogs: [],
      announcements: [],
      donations: []
    });

    const userSaved = await newUser.save();

    return res.status(200).json({
      message: 'Success',
      status: true,
    })
  
  }).catch(error => {
    return res.status(200).json({
      message: 'Success',
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
    if(!admins) {
      return res.status(200).json({
        message: 'No admins found',
        status: false
      })
    }
     return res.status(200).json({
      message: 'Success',
      status: true
    })
  }).catch(error => {
    return res.status(200).json({
      message: `Error: ${error.message}`,
      status: false
    })
  })
  
}

exports.postAddAdmins = (req, res, next) => {

  return res.status(200).json({
    message: 'Success'
  })
}

exports.deleteAddAdmins = (req, res, next) => {

  return res.status(200).json({
    message: 'Success'
  })
}
