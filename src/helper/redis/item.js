const client = require('../../config/redis')
const _ = require('lodash')
const { success,
        noData,
        failed } = require('../response')

module.exports = {
  getItemsRedis: (req, res, next) => {
    client.get('items', (err, result) => {
      if(err){
        failed(res, "Internal Server Error", err)
      }else{
        if(result){;
          const response = JSON.parse(result);
          const name = req.query.name ? req.query.name:'';
          const limit = req.query.limit ? req.query.limit:3;
          const page = req.query.page ? req.query.page:1;
          const offset = page === 1 ? 0 : (page-1)*limit;
          const sort = req.query.sort? req.query.sort:'name';
          const order = req.query.order? req.query.order:'asc';

          
          const search = _.filter(response, (item) => {
            return item.name.includes(name)
          });
          const orderData = _.orderBy(search, sort, order);
          const data = _.slice(orderData, offset, offset+limit);

          const newResult = {
            page: page,
            limit: limit,
            totalData: search.length,
            totalPage: Math.ceil(search.length/limit)
          }
          success(res, "Succes Get Data from redis", newResult, data)
        }else{
          next()
        }
      }
    })
  }
}