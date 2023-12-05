const asyncHandler = require("express-async-handler")
const cloudinary = require("../utils/cloudinary")

const uploadImage = asyncHandler(async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({
				success: false,
				message: "No image provided",
			})
		}

		const result = await cloudinary.uploader.upload(req.file.path, {
			folder: "blogposts", // Add the folder option here
		})

		res.status(200).json({
			success: true,
			message: "Uploaded!",
			data: result,
		})
	} catch (err) {
		console.error(err)
		res.status(500).json({
			success: false,
			message: err,
		})
	}
})

module.exports = { uploadImage }
