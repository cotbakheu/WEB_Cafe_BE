const { modelAllItems, 
        modelInsertItems, 
        modelUpdateItems, 
        modelDeleteItems,
        modelTotalItems,
        modelDetailItems,
        modelAllItemsRedis } = require('../model/item');
const { modelAllCategory } = require('../model/category')
const { success,
        noData,
        failed } = require('../helper/response');
const redisClient = require('../config/redis');
const fs = require('fs');

module.exports = {
    setItemsRedis: (req, res) => {
        modelAllItemsRedis().then((response)=>{
            const data = JSON.stringify(response);
            redisClient.set('items', data);
        }).catch((err)=>{
            failed(res, "Can't Get Data", err)
        })
    },
    getAllItems : async(req,res)=>{
        //sort
        const sort = req.query.sort;
        const sortBy = sort === undefined? '':`ORDER BY ${sort}`;
        //pagination
        const paging = req.query.page;
        const queryLimit = req.query.limit;
        const limit = queryLimit === undefined? 6: queryLimit;
        const offset = paging <= 1? 0:(paging-1)*limit;
        const page = paging === undefined? `LIMIT ${limit}`:`LIMIT ${offset},${limit}`;
        //search
        const find = req.query.search;        
        const search = find === undefined? '': `WHERE name LIKE '%${find}%' OR price LIKE '%${find}%'`;
        const totalData = await modelTotalItems(search);
      modelAllItems(sortBy, page, search)
      .then((response)=> {
          const arr = [];
          response.forEach(element => {
            arr.push({
                id: element.id,
                name: element.name,
                price: element.price,
                category: element.category_name,
            })
        });
          if (arr.length < 1){
              noData(res, 'Data Not Found')
          } else {
            const pages = paging === undefined? 1: paging;
            const result = {
                page: pages,
                limit: limit,
                totalData: totalData[0].total,
                totalPage: Math.ceil(totalData[0].total/limit)
            }
            module.exports.setItemsRedis()
            success(res, "Succes Get Data", result, arr)
          }
      }).catch((err)=>{
          failed(res, "Can't Get Data", err)
      })
    },
    insertItems : async(req,res)=>{
    const data = req.body;
    const category = await modelAllCategory();
    const idCategory = category.filter((element)=>{
        if (data.category === element.category_name){
            return element.id;
        }
    });
    const newData = {
        name: data.name,
        price: data.price,
        image: req.file.filename,
        category: idCategory[0].id,
    };
        modelInsertItems(newData)
        .then((response)=> {
            module.exports.setItemsRedis()
            success(res, 'Succesful Insert Data')
        }).catch((err)=>{
            failed(res, "Internal Server Error", err)
        })
    },
    updateItems : async(req,res)=>{
        const id = req.params.id;
        const data = req.body;
        const delImage = await modelDetailItems(id);
        const path = `./public/img/${delImage[0].image}`;
        const newData = {
            name: data.name,
            price: data.price,
            image: req.file.filename,
            category: data.category
        }
        fs.unlink(path, (err) => {
            if (err) {
                failed(res, "Internal Server Error 'PATH ERROR'", err)
            } else {
                modelUpdateItems(newData, id)
                .then((response)=> {
                    module.exports.setItemsRedis()
                    success(res, 'Succesful Update Data')
                }).catch((err)=>{
                    failed(res, "Internal Server Error", err)
                })
            }
        });        
    },
    deleteItems : async(req,res)=>{
    const id = req.params.id;
    const delImage = await modelDetailItems(id);
    const path = `./public/img/${delImage[0].image}`;
    try {
        fs.unlinkSync(path);
        modelDeleteItems(id)
        .then((response)=> {
            module.exports.setItemsRedis()
            success(res, 'Succesful Delete Data');
        }).catch((err)=>{
            failed(res, "Internal Server Error", err);
        })
    } catch(err) {
        failed(res, "Internal Server Error", err);
    }
        
    },
}