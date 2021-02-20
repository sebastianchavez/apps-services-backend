const express = require('express')
const router = express.Router()
const projectCtrl = require('../controllers/project.controller')

router.get('/get-by-user', projectCtrl.getByUserId)
router.post('/save', projectCtrl.save)
router.put('/update-image', projectCtrl.updateImage)
router.put('/update-project', projectCtrl.updateOneProject)
router.delete('/delete', projectCtrl.deleteOne)

module.exports = router