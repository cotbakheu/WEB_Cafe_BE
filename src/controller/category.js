const { modelAllCategory, 
        modelUpdateCategory, 
        modelDeleteCategory } = require('../model/item')

module.exports = {
    getAllCategory : (req,res)=>{
        const sort = req.query.sort;
        const sortBy = `ORDER BY ${sort}`;
        modelAllCategory(sortBy)
        .then((response)=> {
            res.json(response)
        }).catch((err)=>{
            res.json(err)
        })
    },
    insertCategory : (req,res)=>{
        const data = req.body
            modelInsertCategory(data)
            .then((response)=> {
                res.json(response)
            }).catch((err)=>{
                res.json(err)
            })
        },
    updateCategory : (req,res)=>{
        const id = req.params.id
        const data = req.body
        modelUpdateCategory(data, id)
        .then((response)=> {
            res.json(response)
        }).catch((err)=>{
            res.json(err)
        })
    },
    deleteCategory : (req,res)=>{
        const id = req.params.id
        modelDeleteCategory(id)
        .then((response)=> {
            res.json(response)
        }).catch((err)=>{
            res.json(err)
        })
    },
}        