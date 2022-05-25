const multer = require('multer');
const uniqid = require('uniqid');

const PartyModal = require('./../modal/party');
const BlogModal = require('./../modal/blog');
const AnnouncementModal = require('./../modal/announcement');
const DonationModal = require('./../modal/donation');
// const announcement = require('./../modal/announcement');

let imgPath = '';

const fileStorageParty = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'files/images/electoralParty');
  },
  filename: function (req, file, cb) {
    imgPath = 'p' + '_' + uniqid() + '-' + file.originalname;
    cb(null, imgPath);
  }
});

const fileFilterParty = (req, file, cb) => {
  // if(file.mimetype === 'application/pdf') 
  // {
  //   cb(null, true);
  // } else {
  //   cb(null, false)
  // }
  cb(null, true);
}

exports.blogImg = multer({ storage: fileStorageParty, fileFilter: fileFilterParty }).single('photo');

exports.postAddBlog = async (req, res, next) => {
  console.log('postAddBlog :: req.body :: ', req.body);
  const heading = req.body.heading;
  const p1 = req.body.p1;
  const p2 = req.body.p2;
  // const userId = req.body.heading;
  const userId = '10324';
  const userType = req.body.userType;
  const createdAt = new Date().getTime();

  try {
    const newBlog = await new BlogModal({
      heading, p1, p2, userId, userType, createdAt, imgPath
    })

    const savedBlog = await newBlog.save();
    console.log('postAddBlog :: savedBlog :: ', savedBlog);

    return res.status(201).json({
      message: 'Blog saved successfully',
      status: true,
      data: savedBlog
    })
  } catch (error) {
    return res.status(400).json({
      message: `Error :: ${error.message}`,
      status: false
    })
  }


}

exports.postAddAnnouncement = async (req, res, next) => {
  console.log('postAddAnnouncement :: req.body :: ', req.body);
  const heading = req.body.heading;
  const body = req.body.body;
  const userType = req.body.userType;
  const createdAt = new Date().getTime();
  // const userId = req.body.body;
  const userId = '123';

  try {
    const newAnnouncement = await new AnnouncementModal({
      heading, body, userType, createdAt, userId
    })

    const savedAnnouncement = await newAnnouncement.save();
    console.log('postAddAnnouncement :: savedAnnouncement :: ', savedAnnouncement);

    return res.status(201).json({
      message: 'Success',
      status: true,
      data: savedAnnouncement
    })

  } catch (error) {
    return res.status(400).json({
      message: `Error :: ${error.message}`,
      status: false
    })
  }
}

exports.postAddDonation = (req, res, next) => {
  console.log('postAddDonation :: req.body :: ', req.body);
  const cause = req.body.cause;
  const userType = req.body.userType;
  const createdAt = new Date().getTime();
  // const userId = req.body.body;
  const userId = '123';

  try {
    const newDonation = await new DonationModal({
      cause, userType, userId, createdAt
    })

    const savedDonation = await newDonation.save();
    console.log('postAddDonation :: savedDonation :: ', savedDonation);


    return res.status(201).json({
      message: 'Success',
      status: true,
      data: savedDonation
    })
  } catch (error) {
    return res.status(400).json({
      message: `Error :: ${error.message}`,
      status: false
    })
  }

}



// *************************************************** Admin *******************************************************************  //





// *************************************************** Admin *******************************************************************  //



// *************************************************** Election Party *********************************************************** //



// *************************************************** Admin & Election Party *************************************************** //



