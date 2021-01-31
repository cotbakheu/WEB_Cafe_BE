const { modelAllHistory,
        modelTotalHistory, 
        modelInsertHistory, 
        modelUpdateHistory, 
        modelDeleteHistory,
        modelAllHistoryRedis } = require('../model/history');

const {
    success,
    noData,
    failed } = require('../helper/response');


module.exports = {
    setHistoryRedis: (req, res) => {
        modelAllHistoryRedis().then((response)=>{
            const data = JSON.stringify(response);
            redisClient.set('history', data);
        }).catch((err)=>{
            failed(res, "Can't Get Data", err)
        })
    },
    getAllHistory : async(req,res)=>{
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
        const search = find === undefined? '': `WHERE history.cashier LIKE '%${find}%' OR history.date LIKE '%${find}%' OR history.invoice LIKE '%${find}%'`;
        const totalData = await modelTotalHistory();
        modelAllHistory(sortBy, page, search)
            .then((response)=> {
                const arr = [];
                response.forEach(element => {
                    arr.push({
                        id: element.id,
                        invoice: element.invoice,
                        cashier: element.cashier,
                        category: element.total,
                        quantity: element.quantity,
                        amount: element.total_price,
                    })
                });
                if (arr.length < 1){
                    noData(res, 'Data Not Found')
                } else {
                    const pages = paging === undefined? 1: paging;
                    if (find !== undefined){
                        const result = {
                          page: pages,
                          limit: limit,
                          totalData: arr.length,
                          totalPage: Math.ceil(arr.length/limit)
                      }
                      success(res, "Succes Get Data", result, arr)
                    } else {
                        const result = {
                            page: pages,
                            limit: limit,
                            totalData: totalData[0].total,
                            totalPage: Math.ceil(totalData[0].total/limit)
                        }
                        module.exports.setHistoryRedis()
                        success(res, "Succes Get Data", result, arr)
                      } 
                }
            }).catch((err)=>{
                failed(res, "Can't Get Data", err)
            })
    },
    insertHistory : (req,res)=>{
    const data = req.body;
    const validation = true;
    const validData = data.map((element)=>{
        if(!element.invoice || !element.cashier || !element.product || !element.total_product || !element.price){
             return validation;
        } else {
             return !validation;
        }
    });
    const checkData = validData.filter((element)=>element === true);
        if(checkData.length >= 1) {
            failed(res, "Invalid data Input", err)   
        }else {
            data.map((element)=>{
                modelInsertHistory(element) 
                .then((response)=> {
                    module.exports.setHistoryRedis()
                    success(res, 'Succesful Insert Data')
                }).catch((err)=>{
                    failed(res, "Internal Server Error", err)
                })
            })
        }
    },
    updateHistory : (req,res)=>{
        const id = req.params.id;
        const data = req.body;
        modelUpdateHistory(data, id)
        .then((response)=> {
            module.exports.setHistoryRedis()
            success(res, 'Succesful Update Data')
        }).catch((err)=>{
            failed(res, "Internal Server Error", err)
        })
    },
    deleteHistory : (req,res)=>{
    const id = req.params.id
        modelDeleteHistory(id)
        .then((response)=> {
            module.exports.setHistoryRedis()
            success(res, 'Succesful Delete Data')
        }).catch((err)=>{
            failed(res, "Internal Server Error", err)
        })
    },
}