const mongoose = require('mongoose')
const s3Service = require('../services/s3')
const Project = require('../models/project')
const CONSTANTS = require('../config/constants')
const projectCtrl = {}

projectCtrl.getByUserId = async (req, res) => {
    try {
        const projects = await Project.find({userId: mongoose.Types.ObjectId(req.query.userId)}).sort({createdAt: -1})
        res.json({projects})
    } catch (e) {
        res.status(500).json({message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE})
    }
}

projectCtrl.save = async (req, res) => {
    try {
        const { userId, title, description, category, links, technologies, images } = req.body
        const newProject = new Project({
            userId: mongoose.Types.ObjectId(userId),
            title,
            description,
            category,
            links,
            technologies,
            images
        })
        await newProject.save()
        res.json({message: 'Portafolio creado', project: newProject})
    } catch (e) {
        res.status(500).json({message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE})
    }
}

projectCtrl.updateImage = async (req, res) => {
    try {
        const { image, imageName } = req.body
        const obj = {
            image: image,
            path: 'project/',
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
        res.status(500).json({message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE}) 
    }
}

projectCtrl.updateOneProject = async (req, res) => {
    try {
        const { _id, title, description, category, links, technologies, images } = req.body
        await Project.findByIdAndUpdate(_id, {$set:{title, description, category, links, technologies, images}})
        res.json({message: 'Proyecto actualizado'})
    } catch (e) {
        res.status(500).json({message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE}) 
    }
}

projectCtrl.deleteOne = async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.query.id)
        res.status(200).json({message: 'Proyecto eliminado'})
    } catch (e) {   
        res.status(500).json({message: CONSTANTS.MESSAGES.ERROR.DEFAULT_MESSAGE}) 
    }
}

module.exports = projectCtrl