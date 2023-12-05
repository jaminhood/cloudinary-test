const express = require("express")
const router = express.Router()
const { uploadImage } = require("../controller/postController")

const upload = require("../middleware/multer")

router.post("/upload", upload.single("image"), uploadImage)

module.exports = router
