const mongoose = require('mongoose')
const Scheama = mongoose.Schema

const Project = new Scheama({
    userId: { type: Scheama.Types.ObjectId, ref: 'User' },
    title: String,
    description: String,
    category: String,
    links: [
        {
            name: String,
            url: String
        }
    ],
    technologies: [
        {
            title: String,
            color: String
        }
    ],
    images: [
        {
            image: String,
            imageName: String
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model('Project', Project)