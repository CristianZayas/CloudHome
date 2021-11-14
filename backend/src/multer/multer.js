const multer = require('multer');
const path =  require('path');
const uuid =  require('uuid')
const storeg = (e) =>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, e)
        },
        filename: function (req, file, cb) {
           // console.log(file)
          //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(null,  uuid.v4() + '.'+ path.extname(file.originalname) )
        }
      })
      
      return upload = multer({ storage: storage })
}

module.exports = storeg ;