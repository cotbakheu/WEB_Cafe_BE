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
          const search = req.query.search ? req.query.search.toString().toLowerCase():'';
          const limit = req.query.limit ? req.query.limit:6;
          const page = req.query.page ? req.query.page:1;
          const offset = page === 1 ? 0 : (page-1)*limit;
          const params = req.query.params? req.query.params:'name';
          const sort = req.query.sort? req.query.sort:'asc';

          const searchData = _.filter(response, (item) => {
            return item.name.toLowerCase().includes(search)
          });
          if (searchData.length < 1) {
            noData(res, 'Data Not Found')
          } else {
            const orderData = _.orderBy(searchData, params, sort);
            const data = _.slice(orderData, offset, offset+limit);

            const newResult = {
              page: page,
              limit: limit,
              totalData: searchData.length,
              totalPage: Math.ceil(searchData.length/limit)
            }
            success(res, "Succes Get Data from redis", newResult, data)
          }
        }else{
          next()
        }
      }
    })
  }
}