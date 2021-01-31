const { modelAllCategory, 
        modelUpdateCategory, 
        modelDeleteCategory, 
        modelPostCategory } = require('../model/category');

const {
    success,
    failed } = require('../helper/response');        

module.exports = {
    getAllCategory : (req,res)=>{
        const sort = req.query.sort;
        const sortBy = sort === undefined? '' : `ORDER BY ${sort}`;
        modelAllCategory(sortBy)
        .then((response)=> {
            success(res, "Succes Get Data", {}, response)
        }).catch((err)=>{
            failed(res, "Internal Server Error", err)
        })
    },
    insertCategory : (req,res)=>{
        const data = req.body;
        modelPostCategory(data)
            .then((response)=> {
                success(res, 'Succesful Insert Data')
            }).catch((err)=>{
                failed(res, "Internal Server Error", err)
            })
        },
    updateCategory : (req,res)=>{
        const id = req.params.id;
        const data = req.body;
        modelUpdateCategory(data, id)
        .then((response)=> {
            success(res, 'Succesful Update Data')
        }).catch((err)=>{
            failed(res, "Internal Server Error", err)
        })
    },
    deleteCategory : (req,res)=>{
        const id = req.params.id
        modelDeleteCategory(id)
        .then((response)=> {
            success(res, 'Succesful Delete Data')
        }).catch((err)=>{
            failed(res, "Internal Server Error", err)
        })
    },
}        