require('dotenv').config()
const multer = require("multer")
const cloudinary = require("cloudinary")
const cloudinaryStorage = require("multer-storage-cloudinary")

const setUpMulter = () => {

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });
  const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "demo",
    allowedFormats: ["jpg", "png"],
    secure: true,
    transformation: [{ width: 500, height: 500, crop: "limit" }]
  })
  const parser = multer({ storage: storage })

  return parser
}

module.exports = setUpMulter