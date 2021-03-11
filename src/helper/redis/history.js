const client = require('../../config/redis')
const _ = require('lodash')
const { success,
        noData,
        failed } = require('../response')

module.exports = {
  getHistoryRedis: (req, res, next) => {
    client.get('history', (err, result) => {
      if(err){
        failed(res, "Internal Server Error", err)
      }else{
        if(result){
          const response = JSON.parse(result);
          const search = req.query.search ? req.query.search.toString().toLowerCase():'';
          const limit = req.query.limit ? req.query.limit:7
          const page = req.query.page ? req.query.page:1
          const offset = page === 1 ? 0 : (page-1)*limit
          const params = req.query.params? req.query.params:'date';
          const sort = req.query.sort? req.query.sort:'desc';
          
          const filterData = _.filter(response, (item) => {
            if (item.invoice.toLowerCase().includes(search)) {
              return item.invoice.toLowerCase().includes(search)
            } else if (item.cashier.toLowerCase().includes(search)) {
              return item.cashier.toLowerCase().includes(search)
            } 
          })
          if (filterData.length <= 0){
             noData(res, 'Data Not Found')
          }
          const orderData = _.orderBy(filterData, params, sort);
          const data = _.slice(orderData, offset, offset+limit)

          const pagination = {
            page: page,
            limit: limit,
            total: filterData.length,
            totalPage: Math.ceil(filterData.length/limit)
          }
          success(res, 'Get all history from redis success', pagination, data)
        }else{
          next()
        }
      }
    })
  }
}