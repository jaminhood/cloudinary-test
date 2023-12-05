const multer = require("multer")
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")

// Create a storage engine for multer to upload to Cloudinary
const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: "blogposts", // Replace with your desired folder name
		allowed_formats: ["jpg", "png", "jpeg"], // Define allowed image formats
	},
})

const upload = multer({ storage })

module.exports = upload
