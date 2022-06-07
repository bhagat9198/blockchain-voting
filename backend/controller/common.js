const multer = require('multer');
const uniqid = require('uniqid');

const blogModal = require('./../modal/blog');
const announcementModal = require('./../modal/announcement');
const donationModal = require('./../modal/donation');
const settingsModal = require('./../modal/settings');
const userModal = require('./../modal/user');
const partyModal = require('./../modal/party');

let filePath = '';
let fileName = '';

const fileStorage = ({ fileStoragePath, filenamePrefix }) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      filePath = fileStoragePath;
      cb(null, `files/${fileStoragePath}`);
    },
    filename: function (req, file, cb) {
      fileName = `${filenamePrefix}-${file.originalname}`;
      cb(null, fileName);
    }
  });
}

const fileFilter = () => {
  return (req, file, cb) => {
    // if(file.mimetype === 'application/pdf') 
    // {
    //   cb(null, true);
    // } else {
    //   cb(null, false)
    // }
    cb(null, true);
  }
}

// ****************************************************************************************************** //

exports.getAnnouncements = async (req, res, next) => {
  const latest = req.query.latest;
  console.log('common :: getAnnouncements :: latest :: ', latest);
  let announcements;

  try {
    if (latest) {
      announcements = await announcementModal.find().limit(4);
    } else {
      announcements = await announcementModal.find();
    }
    console.log('getAnnouncements :: announcements ::', announcements);
    return res.status(200).json({
      status: true,
      message: "Successfully fetched the data",
      data: announcements
    })
  } catch (error) {
    console.log('getAnnouncements :: error :: ', error);
    return res.status(400).json({
      status: false,
      message: error.message
    })
  }
}

exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await blogModal.find();
    console.log('getBlogs :: blogs :: ', blogs);
    return res.status(200).json({
      status: true,
      message: "Successfully fetched the data",
      data: blogs
    })
  } catch (error) {
    console.log('getBlogs :: error :: ', error);
    return res.status(400).json({
      status: false,
      message: error.message
    })
  }
}

exports.getDonations = async (req, res, next) => {
  try {
    const donations = await donationModal.find();
    console.log('getDonations :: donations :: ', donations);
    return res.status(200).json({
      status: true,
      message: "Successfully fetched the data",
      data: donations
    })
  } catch (error) {
    console.log('getDonations :: error :: ', error);
    return res.status(400).json({
      status: false,
      message: error.message
    })
  }
}

exports.profilePic = multer({
  storage: fileStorage({ fileStoragePath: `images/users`, filenamePrefix: `u_${uniqid()}` }),
  fileFilter: fileFilter()
}).single('photo');

exports.postProfilePic = async (req, res, next) => {
  const _id = req.body._id;
  // const img = req.body.img;
  try {
    const user = await userModal.findById(_id);
    // console.log('postUserImg :: user :: ', user);
    if(!user) {
      return res.status(200).json({
        status: true,
        message: "No user found with this id",
      })
    }

    user.profileImg = {};
    user.profileImg = {
      filePath,
      fileName,
      updatedAt: new Date().getTime()
    }
    await user.save();
    return res.status(201).json({
      status: true,
      message: "Successfully updated profile image",
    })
  } catch (error) {
    console.log('postUserImg :: error :: ', error);
    return res.status(400).json({
      status: false,
      message: error.message
    })
  }
}

exports.getAdminSettings = (req, res, next) => {
  settingsModal.find().then(settings => {

    if (!settings) {
      return res.status(400).json({
        message: 'No settings found',
        status: false
      })
    }
    return res.status(200).json({
      message: 'Success',
      status: true,
      data: {
        settings
      }
    })
  }).catch(error => {
    return res.status(400).json({
      message: `Error: ${error.message}`,
      status: false
    })
  })

}

exports.getParty = async (req, res, next) => {
  const _id = req.params._id;
  console.log('common :: getParty :: _id :: ', _id);
  try {
    const party = await partyModal.findById(_id);
    console.log('common :: getParty :: party :: ',party );
    if(!party) {
      return res.status(400).json({
        status: false,
        message: 'Invalid party id'
      })
    }
    return res.status(200).json({
      status: true,
      message: 'success',
      data: party
    })
  } catch(error) {
    console.log('common :: getParty :: error :: ', error);
    return res.status(400).json({
      status: false,
      message: error.message
    })
  }
}

// exports.getElectionResult = async (req, res, next) => {

// }

