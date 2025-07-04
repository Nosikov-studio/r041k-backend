const Category = require('../models/Category');
const errorHandler = require('../utils/error-handler');


module.exports.getAll = async function(req, res) {
    //res.json({message:"categoris!!!!!!"})
    try {
        // const categories = await Category.find({user: req.user.id})
        const categories = await Category.find()
        res.status(200).json(categories)

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function(req, res) {
        try {
        const category = await Category.findById(req.params.id)
        res.status(200).json(category)

    } catch (e) {
        errorHandler(res, e)
    }
}


// module.exports.remove = async function(req, res) {
//         try {
//     await Category.remove({_id: req.params.id})
//     res.status(200).json({message: 'Категория удалена'})
//     } catch (e) {
//         errorHandler(res, e)
//     }
// }

module.exports.remove = async function(req, res) {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({message: 'Категория не найдена'});
    }
    res.status(200).json({message: 'Категория удалена'});
  } catch (e) {
    errorHandler(res, e);
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

module.exports.update =async function(req, res) {
    const updated ={
        name: req.body.name
    }
    if (req.file) {
        updated.imageSrc = req.file.path
    }
    try {
        const category = await Category.findByIdAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
}