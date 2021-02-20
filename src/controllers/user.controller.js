const User = require('../models/user')
const CONSTANTS = require('../config/constants')
const bcrypt = require('bcrypt-nodejs')
const tokenService = require('../services/token')
const s3Service = require('../services/s3')
const userCtrl = {}

userCtrl.getById = async (req, res) => {
    try {
        const user = await User.findById(req.query.id)
        res.json({ user })
    } catch (e) {
        res.status(500).json({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
    }
}

userCtrl.login = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(req.body)
        let userData = await User.findOne({ email })
        if (userData) {
            if (bcrypt.compareSync(password, userData.password) === true) {
                const token = tokenService.createToken(userData)
                let user = {
                    _id: userData._id,
                    email: userData.email,
                    accessToken: token,
                }
                return res.status(200).json({user})
            } else {
                res.status(400).send({ message: 'Contraseña incorrecta' })
            }
        } else {
            res.status(404).send({ message: 'Usuario inválido' })
        }
    } catch (e) {
        console.log('Error: ',e)
        res.status(500).json({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
    }
}

userCtrl.register = async (req, res) => {
    try {
        const { email, password } = req.body
        const newUser = new User({
            email,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
        })
        await newUser.save()
        res.json({ message: 'Usuario registrado con éxito' })
    } catch (e) {
        res.status(500).json({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
    }
}

userCtrl.save = async (req, res) => {
    try {
        const { name, title, description, profileImage, profileImageName, coverImage, coverImageName, email, password, skills } = req.body
        const newUser = new User({
            name,
            title,
            description,
            profileImage,
            profileImageName,
            coverImage,
            coverImageName,
            email,
            password,
            skills
        })
        await newUser.save()
        res.json({ message: 'Usuario creado' })
    } catch (e) {
        res.status(500).json({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
    }
}

userCtrl.updateProfileImage = async (req, res) => {
    try {
        const { image, imageName } = req.body
        const obj = {
            image: image,
            path: 'profile/',
            name: imageName
        }
        s3Service.saveImage(obj, (error, response) => {
            if (error) {
                console.log('Error s3:', error)
                return res.status(500).json({ message: 'Problemas con servicio de imagenes, favor intente más tarde' })
            } else {
                return res.status(200).json({ urlImage: response.Location })
            }
        })
    } catch (e) {
        res.status(500).json({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
    }
}


userCtrl.updateCoverImage = async (req, res) => {
    try {
        const { image, imageName } = req.body
        const obj = {
            image: image,
            path: 'cover/',
            name: imageName
        }
        s3Service.saveImage(obj, (error, response) => {
            if (error) {
                console.log('Error s3:', error)
                return res.status(500).json({ message: 'Problemas con servicio de imagenes, favor intente más tarde' })
            } else {
                return res.status(200).json({ urlImage: response.Location })
            }
        })
    } catch (e) {
        res.status(500).json({ message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE })
    }
}

module.exports = userCtrl