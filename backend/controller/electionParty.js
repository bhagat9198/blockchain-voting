const multer = require('multer');
const uniqid = require('uniqid');

const PartyModal = require('../modal/party');

let partyImgName = '';

const fileStorageParty = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'files/images/electoralParty');
  },
  filename: function (req, file, cb) {
    partyImgName = 'p' + '_' + uniqid() + '-' + file.originalname;
    cb(null, partyImgName);
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


exports.partyImg = multer({ storage: fileStorageParty, fileFilter: fileFilterParty }).single('photo');

exports.postUpdateElectoralParty = async (req, res, next) => {
  console.log('postUpdateElectoralParty :: body :: ', req.body);
  console.log('postUpdateElectoralParty :: body :: ', req.file);
  const partyName = req.body.partyName
  const candidateName = req.body.candidateName
  const symbolName = req.body.symbolName
  const moto = req.body.moto
  const vision = req.body.vision
  const state = req.body.state
  const district = req.body.district
  const userType = req.body.userType
  const createdAt = new Date().getTime()
  const imgPath = partyImgName.path;

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
      imgPath
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


