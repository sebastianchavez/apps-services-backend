const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user.controller')

router.get('/get-user', userCtrl.getById)
router.post('/save-user', userCtrl.save)
router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)
router.put('/update-profile-image', userCtrl.updateProfileImage)
router.put('/update-cover-image', userCtrl.updateCoverImage)

module.exports = router