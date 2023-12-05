const express = require("express")
const router = express.Router()
const { getPost, getPosts, getUserPost, getAllCategory, getCategory, createpost, deletePost, updatePost, uploadImage } = require("../controller/postController")

const { isAuthenticatedUser } = require("../middleware/authMiddleware")
const upload = require("../middleware/multer")

router.post("/create", createpost)
router.delete("/:id", deletePost)
router.post("/upload", upload.single("image"), uploadImage)
router.post("/:id", updatePost)
router.get("/category", getCategory)
router.get("/category/getall", getAllCategory)
// router.post("/upload-images", addImages)

router.get("/:id", getPost)
router.get("/", getPosts)
router.get("/user/:userId", getUserPost)

module.exports = router
