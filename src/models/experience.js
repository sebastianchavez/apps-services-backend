const mongoose = require('mongoose')
const Scheama = mongoose.Schema

const Experience = new Scheama({
    userId: { type: Scheama.Types.ObjectId, ref: 'User' },
    sentence: String,
    experience: [
        {
            year: Number,
            month: String,
            description: String,
            image: String,
            imageName: String
        }
    ]
})

module.exports = mongoose.model('Experience', Experience)