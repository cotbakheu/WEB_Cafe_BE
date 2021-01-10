const { modelAllItems, 
        modelInsertItems, 
        modelUpdateItems, 
        modelDeleteItems } = require('../model/item')

module.exports = {
    getAllItems : (req,res)=>{
        const sort = req.query.sort;
        const sortBy = `ORDER BY ${sort}`;
        const paging = req.query.page;
        const limit = 3;
        const offset = paging === 1? 0:(paging-1)*limit;
        const page = `LIMIT ${offset},${limit}`;        
        const search = `WHERE name LIKE '%${req.query.search}%'`;
      modelAllItems(sortBy, page, search)
      .then((response)=> {
          res.json(response)
      }).catch((err)=>{
          res.json(err)
      })
    },
    insertItems : (req,res)=>{
    const data = req.body
        modelInsertItems(data)
        .then((response)=> {
            res.json(response)
        }).catch((err)=>{
            res.json(err)
        })
    },
    updateItems : (req,res)=>{
        const id = req.params.id
        const data = req.body
        modelUpdateItems(data, id)
        .then((response)=> {
            res.json(response)
        }).catch((err)=>{
            res.json(err)
        })
    },
    deleteItems : (req,res)=>{
    const id = req.params.id
        modelDeleteItems(id)
        .then((response)=> {
            res.json(response)
        }).catch((err)=>{
            res.json(err)
        })
    },
}