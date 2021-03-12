const { modelAllHistory,
        modelTotalHistory, 
        modelInsertHistory, 
        modelUpdateHistory, 
        modelDeleteHistory,
        modelAllHistoryRedis,
        modelDetailHistory } = require('../model/history');

const {
    success,
    noData,
    failed } = require('../helper/response');
const redisClient = require('../config/redis');


module.exports = {
    setHistoryRedis: (req, res) => {
        modelAllHistoryRedis().then((response)=>{
            const data = JSON.stringify(response);
            redisClient.set('history', data);
        }).catch((err)=>{
            failed(res, "Can't Get Data")
        })
    },
    getAllHistory : async(req,res)=>{
        //sort
        const sort = req.query.sort? req.query.sort: 'DESC';
        const params = req.query.params? req.query.params: 'date';
        //pagination
        const page = req.query.page? req.query.page:1;
        const limit = req.query.limit? req.query.limit: 7;
        const offset = page <= 1? 0:(page-1)*limit;
        //search        
        const search = req.query.search? req.query.search: '%' ;
        const totalData = await modelTotalHistory(search);

        modelAllHistory(params, sort, limit, offset, search)
            .then((response)=> {
                if (response.length < 1){
                    noData(res, 'Data Not Found')
                } else {
                        const pagination = {
                          page,
                          limit,
                          totalData: totalData.length,
                          totalPage: Math.ceil(totalData.length/limit)
                        }
                        module.exports.setHistoryRedis()
                      success(res, "Succes Get Data", pagination, response) 
                }
            }).catch((err)=>{
                console.log(err)
                failed(res, "Can't Get Data", err)
            })
    },
    insertHistory : (req,res)=>{
    const data = req.body;
    const validation = true;
    const validData = data.map((element)=>{
        if(!element.invoice || !element.cashier || !element.id_product || !element.total_product || !element.price){
             return !validation;
        } else {
             return validation;
        }
    });
    const checkData = validData.filter((element)=>element === false);
        if(checkData.length >= 1) {
            failed(res, "Invalid data Input")   
        }else {
            const result = data.map((element)=>{
                modelInsertHistory(element) 
                .then((response)=> {                    
                    return response
                    // success(res, 'Succesful Insert Data')
                }).catch((err)=>{
                    console.log(err)
                    // failed(res, "Internal Server Error")
                })
            })
            if(result) {
                module.exports.setHistoryRedis()
                success(res, 'Succesful Insert Data', {}, {})
            } else {
                console.log('error')
            }
        }
    },
    detailHistroy: (req, res)=> {
        const invoice = req.params.invoice;
        console.log(invoice)
        modelDetailHistory(invoice).then((response)=>{
            success(res, 'Success get detail history',{}, response,)
        }).catch((err)=>{
            	console.log(err)
		failed(res, 'server error')
        })
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
    const invoice = req.params.invoice
        modelDeleteHistory(invoice)
        .then((response)=> {
            module.exports.setHistoryRedis()
            success(res, 'Succesful Delete Data')
        }).catch((err)=>{
            failed(res, "Internal Server Error", err)
        })
    },
}
