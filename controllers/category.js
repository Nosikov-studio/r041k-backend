const Category = require('../models/Category');
const errorHandler = require('../utils/error-handler');


module.exports.getAll = async function(req, res) {
    //res.json({message:"categoris!!!!!!"})
    try {
        const categories = await Category.find({user: req.user.id})
        res.status(200).json(categories)

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function(req, res) {
        try {
        const Category = await Category.findById(req.params.id)
        res.status(200).json(category)

    } catch (e) {
        errorHandler(res, e)
    }
}


module.exports.remove = async function(req, res) {
        try {
    await Category.remove({_id: req.params.id})
    res.status(200).json({message: 'Категория удалена'})
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function(req, res) {
    const category = new Category ({
        name: req.body.name,
        user: req.user.id,
        imageSrc: req.file ? req.file.path : ''
    })
    try {
        await category.save()
        res.status(201).json(category)

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = function(req, res) {
        try {

    } catch (e) {
        errorHandler(res, e)
    }
}