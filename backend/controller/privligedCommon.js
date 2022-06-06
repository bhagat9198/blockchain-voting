const multer = require('multer');
const uniqid = require('uniqid');
const bcrypt = require("bcrypt");

const PartyModal = require('./../modal/party');
const BlogModal = require('./../modal/blog');
const AnnouncementModal = require('./../modal/announcement');
const DonationModal = require('./../modal/donation');
const Admin = require('./../modal/admin');
const User = require('./../modal/user');
const Vote = require('./../modal/vote');
const settingsModal = require('./../modal/settings');
const bycryptSaltRounds = Number(process.env.BYCRYPT_SALT_ROUNDS);

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

// *************************************************** Admin & Election Party *************************************************** //

exports.blogImg = multer({
  storage: fileStorage({ fileStoragePath: `images/blogs`, filenamePrefix: `b_${uniqid()}` }),
  fileFilter: fileFilter()
}).single('photo');

exports.postAddBlog = async (req, res, next) => {
  // console.log('postAddBlog :: req.body :: ', req?.body);
  // console.log('postAddBlog :: req.file :: ', req?.file);
  const heading = req.body.heading;
  const p1 = req.body.p1;
  const p2 = req.body.p2;
  const p3 = req.body.p3;
  const userId = req.body._id;
  const userType = req.body.userType;

  const createdAt = new Date().getTime();

  try {
    const newBlog = await new BlogModal({
      heading, p1, p2, p3, userId, userType, createdAt, 
      imgPath: filePath, imgName: fileName
    })

    const savedBlog = await newBlog.save();
    console.log('postAddBlog :: savedBlog :: ', savedBlog);

    return res.status(201).json({
      message: 'Blog saved successfully',
      status: true,
      data: savedBlog
    })
  } catch (error) {
    console.log('postAddBlog :: error :: ', error);
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
  const createdAt = new Date().getTime();
  const userType = req.body.userType;
  const userId = req.body._id;

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

exports.postAddDonation = async (req, res, next) => {
  console.log('postAddDonation :: req.body :: ', req.body);
  const heading = req.body.heading;
  const cause = req.body.cause;
  const userType = req.body.userType;
  const createdAt = new Date().getTime();
  const userId = req.body._id;

  try {
    const newDonation = await new DonationModal({
      heading, cause, userType, userId, createdAt
    })

    const savedDonation = await newDonation.save();
    // console.log('postAddDonation :: savedDonation :: ', savedDonation);

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

exports.postAddAdmin = async (req, res, next) => {
  console.log('postAddAdmin :: req.body :: ', req.body);
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const createdById = req.body._id;
  const createdByName = req.body.createdByName;
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
    createdByName,
    createdById
  });

  try {
    const savedAdmin = await newAdmin.save();
    // console.log('postAddAdmins :: savedAdmin :: ', savedAdmin);
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


exports.getVoteStatus = async (req, res, next) => {
  const status = req.query.status;
  // console.log('getVoteStatus :: status :: ', status);
  try {
    const setting = await settingsModal.findById('62978e33de7489d369a1cd3b')
    // console.log('getVoteStatus :: setting :: ', setting);
    setting.votingPhase = status;
    const updatedSetting = await setting.save();
    // console.log('getVoteStatus :: updatedSetting :: ', updatedSetting);
    return res.status(201).json({
      message: `Successfully saved the changes`,
      status: true
    })

  } catch (error) {
    return res.status(400).json({
      message: `Error: ${error.message}`,
      status: false
    })
  }

}

exports.getElectionResultStatus = async (req, res, next) => {
  const status = req.query.status;
  // console.log('getVoteStatus :: status :: ', status);
  try {
    const setting = await settingsModal.findById('62978e33de7489d369a1cd3b')
    setting.results = status;
    const updatedSetting = await setting.save();
    return res.status(201).json({
      message: `Successfully saved the changes`,
      status: true
    })

  } catch (error) {
    return res.status(400).json({
      message: `Error: ${error.message}`,
      status: false
    })
  }
}


// *************************************************** Election Party *********************************************************** //

exports.partyImg = multer({
  storage: fileStorage({ fileStoragePath: `images/electoralParty`, filenamePrefix: `p_${uniqid()}` }),
  fileFilter: fileFilter()
}).single('photo');

exports.postUpdateElectoralParty = async (req, res, next) => {
  console.log('postUpdateElectoralParty :: body :: ', req.body);
  // console.log('postUpdateElectoralParty :: body :: ', req.file);
  const partyName = req.body.partyName
  const candidateName = req.body.candidateName
  const symbolName = req.body.symbolName
  const moto = req.body.moto
  const vision = req.body.vision
  const state = req.body.state
  const district = req.body.district
  const userType = req.body.userType
  const account = req.body.account
  const userId = req.body._id
  const createdAt = new Date().getTime()

  try {
    const newParty = await new PartyModal({
      partyName,
      candidateName,
      symbolName,
      moto,
      vision,
      state,
      district,
      userType,
      createdAt,
      imgPath: filePath,
      imgName: fileName,
      account,
      userId,
    })
    const savedParty = await newParty.save();

    return res.status(201).json({
      message: 'Successfully updated party info',
      status: true,
      data: savedParty
    })

  } catch (error) {
    console.log('postUpdateElectoralParty :: error :: ', error);
    return res.status(400).json({
      message: 'Error :: ' + error.message,
      status: false
    })
  }

}




