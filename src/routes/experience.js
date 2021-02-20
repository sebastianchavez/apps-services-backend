const express = require('express')
const router = express.Router()
const experienceCtrl = require('../controllers/experience.controller')

router.get('/get-by-user', experienceCtrl.getByUserId)
router.post('/save', experienceCtrl.save)   

module.exports = router