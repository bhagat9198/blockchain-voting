let BASE_URL = '';

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:5000'
} else {
  BASE_URL = 'https://blockchain-voting-project.herokuapp.com'
}


const darkColors = ['#242582', '#F64C72', '#553D67', '#8D8741', '#05386B', '#379683', '#FC4445', '#EDF5E1', '#8EE4AF', '#907163', '#5D5C61', '#557A95', '#2E1114', '#501B1D', '#64485C', '#190061', '#240090', '#3500D3', '#282828', '#0C0032', '#45A29E', '#5D001E'];
const lightColors = ['#85DCB', '#E8A87C', '#FBEEC1', '#DAAD86', '#EDF5E1', '#8EE4AF', '#CAFAFE', '#97CAEF', '#B1A296', '#C2CAD0', '#C2B9B0', '#AFD275', '#E7717D', '#66FCF1', '#C5C6C7', '#E3AFBC', '#E3E2DF', '#EE4C7C', '#E3E2DF', '#EFE2BA', '#C5CBE3', '#D79922'];
const mixedColors = ['red', 'plum', 'orange', 'olive', 'green', 'purple', 'brown', 'gold', 'violet', 'indigo']

const colorCombinations = [
  { c1: '#949398FF', c2: '#F4DF4EFF' },
  { c1: '#FC766AFF', c2: '#FC766AFF' },
  { c1: '#5F4B8BFF', c2: '#E69A8DFF' },
  { c1: '#00203FFF', c2: '#ADEFD1FF' },
  { c1: '#606060FF', c2: '#D6ED17FF' },
  { c1: '#00539CFF', c2: '#EEA47FFF' },
  { c1: '#0063B2FF', c2: '#9CC3D5FF' },
  { c1: '#101820FF', c2: '#FEE715FF' },
  { c1: '#89ABE3FF', c2: '#FCF6F5FF' },
  { c1: '#101820FF', c2: '#F2AA4CFF' },
  { c1: '#195190FF', c2: '#A2A2A1FF' },
  { c1: '#603F83FF', c2: '#C7D3D4FF' },
  { c1: '#2BAE66FF', c2: '#FCF6F5FF' },
  { c1: '#FAD0C9FF', c2: '#6E6E6DFF' },
  { c1: '#2D2926FF', c2: '#E94B3CFF' },
  { c1: '#990011FF', c2: '#FCF6F5FF' },
  { c1: '#FAEBEFFF', c2: '#333D79FF' },
  { c1: '#F93822FF', c2: '#FDD20EFF' },
]


const imgObjectUrl = ({ fileImg }) => {
  // console.log('imgObjectUrl :: fileImg :: ', fileImg);
  if (!fileImg) {
    return {
      status: false
    }
  }
  const objectUrl = URL.createObjectURL(fileImg)
  return {
    status: true,
    imgObj: objectUrl,
  }
}


module.exports.BASE_URL = BASE_URL;
module.exports.darkColors = darkColors;
module.exports.lightColors = lightColors;
module.exports.colorCombinations = colorCombinations;
module.exports.imgObjectUrl = imgObjectUrl;