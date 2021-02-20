const mongoose = require('mongoose')
const Scheama = mongoose.Schema

const User = new Scheama({
    name: String,
    title: String,
    description: String,
    profileImage: String,
    profileImageName: String,
    coverImage: String,
    coverImageName: String,
    email: String,
    password: String,
    skills: [
        {
            icon: String,
            iconName: String,
            title: String,
            description: String
        }
    ]
},{
    timestamps: true
})

module.exports = mongoose.model('User', User)