const connection = require('../config/db');

module.exports = {
    modelAllHistory: (params, sort, limit, offset, search)=> {
        return new Promise ((resolve, reject)=> {
            connection.query(`SELECT history.id, history.invoice, history.cashier, history.date, SUM(history.total_product) AS quantity, SUM(history.price) AS amount FROM history LEFT JOIN product ON history.id_product = product.id WHERE (cashier LIKE '%${search}%' OR invoice LIKE '%${search}%') GROUP BY invoice ORDER BY ${params} ${sort} LIMIT ${offset},${limit}`, (err, result)=>{
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
            connection.query(`SELECT history.id, history.invoice, history.cashier, history.date, SUM(history.total_product) AS quantity, SUM(history.price) AS amount FROM history JOIN product ON history.id_product = product.id GROUP BY invoice`, (err, result)=>{
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })    
        })
    },
    modelTotalHistory: (search)=> {
        return new Promise ((resolve, reject)=> {
            connection.query(`SELECT * FROM history WHERE invoice LIKE '%${search}%' OR cashier LIKE '%${search}%' GROUP BY invoice`, (err, result)=>{
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })    
        })
    },
    modelDetailHistory: (invoice)=> {
        return new Promise ((resolve, reject)=> {
            connection.query(`SELECT history.id, history.invoice, history.cashier, history.date, history.price, product.name FROM history LEFT JOIN product ON history.id_product = product.id WHERE history.invoice Like ='${invoice}'`, (err, result)=>{
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
            connection.query(`INSERT INTO history SET ? `, data, (err, result)=>{
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