const connection = require('../config/db');

module.exports = {
    modelAllHistory: (sort, page, search)=> {
        return new Promise ((resolve, reject)=> {
            connection.query(`SELECT history.id, history.invoice, history.cashier, history.date, SUM(history.total_product) AS quantity, SUM(history.total_price) AS amount FROM history JOIN product ON history.id_product = product.id GROUP BY invoice ${sort} ${page} ${search} `, (err, result)=>{
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })    
        })
    },
    modelAllHistoryRedis: ()=> {
        return new Promise ((resolve, reject)=> {
            connection.query(`SELECT history.id, history.invoice, history.cashier, history.date, SUM(history.total_product) AS quantity, SUM(history.total_price) AS amount FROM history JOIN product ON history.id_product = product.id GROUP BY invoice`, (err, result)=>{
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })    
        })
    },
    modelTotalHistory: ()=> {
        return new Promise ((resolve, reject)=> {
            connection.query(`SELECT COUNT(*) as total FROM history`, (err, result)=>{
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })    
        })
    },
    modelInsertHistory: (data)=> {
        return new Promise ((resolve, reject)=> {
            connection.query(`INSERT INTO history (invoice, cashier, id_product, total_product, price) VALUES ('${data.invoice}','${data.cashier}','${data.product}','${data.total_product}','${data.price}')`, (err, result)=>{
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })    
        })
    },
    modelUpdateHistory: (data, id)=> {
        return new Promise ((resolve, reject)=> {
            connection.query(`UPDATE history SET invoice='${data.invoice}', cashier='${data.cashier}', id_product='${data.product}', total_product='${data.total_product}', price='${data.price}' WHERE id='${id}'`, (err, result)=>{
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })    
        })
    },
    modelDeleteHistory: (id)=> {
        return new Promise ((resolve, reject)=> {
            connection.query(`DELETE FROM history WHERE id='${id}'`, (err, result)=>{
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })    
        })
    },
}