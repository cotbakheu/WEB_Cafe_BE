const { modelAllHistory, 
        modelInsertHistory, 
        modelUpdateHistory, 
        modelDeleteHistory } = require('../model/item')


module.exports = {
    getAllHistory : (req,res)=>{
        const sort = req.query.sort;
        const sortBy = `ORDER BY ${sort}`;
        modelAllHistory(sortBy)
        .then((response)=> {
            res.json(response)
        }).catch((err)=>{
            res.json(err)
        })
    },
    insertHistory : (req,res)=>{
    const data = req.body
    console.log(data)
        modelInsertHistory(data)
        .then((response)=> {
            console.log(response)
            res.json(response)
        }).catch((err)=>{
            res.json(err)
        })
    },
    updateHistory : (req,res)=>{
        const id = req.params.id
        const data = req.body
        modelUpdateHistory(data, id)
        .then((response)=> {
            res.json(response)
        }).catch((err)=>{
            res.json(err)
        })
    },
    deleteHistory : (req,res)=>{
    const id = req.params.id
        modelDeleteHistory(id)
        .then((response)=> {
            res.json(response)
        }).catch((err)=>{
            res.json(err)
        })
    },
}