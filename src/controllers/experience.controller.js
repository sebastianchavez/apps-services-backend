const mongoose = require('mongoose')
const Experience = require('../models/experience')
const CONSTANTS = require('../config/constants')
const experienceCtrl = {}

experienceCtrl.getByUserId = async (req, res) => {
    try {
        const experience = await Experience.findOne({userId: mongoose.Types.ObjectId(req.query.userId)})
        res.json({experience})
    } catch (e) {
        res.status(500).json({message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE})
    }
}

experienceCtrl.save = async (req, res) => {
    try {
        const { userId, sentence, experience } = req.body
        const newExperience = new Experience({
            userId: mongoose.Types.ObjectId(userId),
            sentence,
            experience
        })
        await newExperience.save()
        res.json({message: 'Experiencia agregada'})
    } catch (e) {
        res.status(500).json({message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE})
    }
}

module.exports = experienceCtrl