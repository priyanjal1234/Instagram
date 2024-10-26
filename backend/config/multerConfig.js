const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", 
    allowed_formats: ["jpg", "png", "jpeg"], // Allowed file formats
    public_id: (req, file) => `${Date.now()}-${file.originalname}`, // Custom filename
  },
});


const upload = multer({storage: storage})

module.exports = upload