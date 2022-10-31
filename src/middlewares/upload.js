const multer = require('multer');
const { success, error } = require("../utils/responses");

const storage = multer.diskStorage({   
  destination: function(req, file, cb) { 
     cb(null, './uploads');    
  }, 
  filename: function (req, file, cb) { 
     cb(null , `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits : {fileSize : 100000000}
}).single("file");

const uploadImage = async (req, res ,next) => {  
    upload(req, res, (err) => {
      try{
        const file =  req.file;
        if(file == undefined) return res.status(400).send(error('file is required'))
        next();
      }catch(err){
        return res.status(400).send(error('Error 400',err.message))
      }
    });
}

const uploadImageWithUpdate = async (req, res ,next) => {  
  upload(req, res, (err) => {
    try{
      next();
    }catch(err){
      return res.status(400).send(error('Error 400',err.message))
    }
  });
}
module.exports = {
  uploadImage,
  uploadImageWithUpdate
}
