const multer = require('multer');
const uniqid = require('uniqid');

const blogModal = require('./../modal/blog');
const announcementModal = require('./../modal/announcement');
const donationModal = require('./../modal/donation');

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
  try {
    const announcements = await announcementModal.find();
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

exports.userImg = multer({
  storage: fileStorage({ fileStoragePath: `images/users`, filenamePrefix: `u_${uniqid()}` }),
  fileFilter: fileFilter()
}).single('photo');

exports.postUserImg = async (req, res, next) => {
  const uid = req.body.uid;
  const img = req.body.img;
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




exports.getElectionParties = async (req, res, next) => {

}

exports.getElectionResult = async (req, res, next) => {

}

