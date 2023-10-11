const express = require("express")
const PostController = require('./PostController')

const router = new express.Router()

router.post('/create', PostController.create)
router.get('/getAll', PostController.getAll)


module.exports = router