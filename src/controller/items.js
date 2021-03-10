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
        const sort = req.query.sort? req.query.sort: 'ASC';
        const params = req.query.params? req.query.params: 'name';
        //pagination
        const page = req.query.page? req.query.page:1;
        const limit = req.query.limit? req.query.limit: 6;
        const offset = page <= 1? 0:(page-1)*limit;
        //search        
        const search = req.query.search? req.query.search: '%' ;
        const totalData = await modelTotalItems(search);
      modelAllItems(params, sort, limit, offset, search)
      .then((response)=> {
          if (response.length < 1){
              noData(res, 'Data Not Found')
          } else {
            const pagination = {
                page,
                limit,
                totalData: totalData[0].total,
                totalPage: Math.ceil(totalData[0].total/limit)
            }
            module.exports.setItemsRedis()
            success(res, "Succes Get Data", pagination, response)
          }
      }).catch((err)=>{
          console.log(err)
          failed(res, "Server Error", err)
      })
    },
    detailItem: (req, res)=> {
        const id = req.params.id
        modelDetailItems(id).then((response)=>{
            success(res, 'Get Detail Success', {}, response)
        }).catch((err)=> {
            failed(res, 'Server Error')
        })
    },
    insertItems : async(req,res)=>{
    const data = req.body;
    const newData = {
        name: data.name,
        price: data.price,
        image: req.file.filename,
       category: data.category,
    };
        modelInsertItems(newData)
        .then((response)=> {
            module.exports.setItemsRedis()
            success(res, 'Succesful Insert Data')
        }).catch((err)=>{
            console.log(err)
            failed(res, "Internal Server Error", err)
        })
    },
    updateItems : async(req,res)=>{        
        const data = req.body;
        const id = req.params.id;
        const delImage = await modelDetailItems(id);
        const path = `./public/images/${delImage[0].image}`;
        const newData = {
            name: data.name,
            price: data.price,
            image: req.file.filename,
            id_category: data.category
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
                    console.log(err)
                    failed(res, "Internal Server Error", err)
                })
            }
        });        
    },
    deleteItems : async(req,res)=>{
    const id = req.params.id;
    const delImage = await modelDetailItems(id);
    const path = `./public/images/${delImage[0].image}`;
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
