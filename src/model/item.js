const connection = require('../config/db');

module.exports = {
    //product model
    modelAllItems: (params, sort, limit, offset, search)=> {
        return new Promise ((resolve, reject)=> {
            connection.query(`SELECT * FROM product LEFT JOIN category ON product.id_category = category.id WHERE product.name LIKE '%${search}%' ORDER BY ${params} ${sort} LIMIT ${offset},${limit} `, (err, result)=>{
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })    
        })
    },
    modelDetailItems: (id)=> {
        return new Promise ((resolve, reject)=> {
            connection.query(`SELECT * FROM product JOIN category ON product.id_category = category.id WHERE product.id='${id}'`, (err, result)=>{
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })    
        })
    },
    modelAllItemsRedis: ()=> {
        return new Promise ((resolve, reject)=> {
            connection.query(`SELECT * FROM product JOIN category ON product.id_category = category.id`, (err, result)=>{
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })    
        })
    },
    modelTotalItems: (search)=> {
        return new Promise ((resolve, reject)=> {
            connection.query(`SELECT COUNT(*) as total FROM product WHERE product.name LIKE '%${search}%'`, (err, result)=>{
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })    
        })
    },
    modelInsertItems: (data)=> {
        return new Promise ((resolve, reject)=> {
            connection.query(`INSERT INTO product (name, price, image, id_category) VALUES ('${data.name}','${data.price}','${data.image}','${data.category}')`, (err, result)=>{
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })    
        })
    },
    modelUpdateItems: (data, id)=> {
        return new Promise ((resolve, reject)=> {
            connection.query(`UPDATE product SET ? WHERE id='${id}'`, data, (err, result)=>{
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })    
        })
    },
    modelDeleteItems: (id)=> {
        return new Promise ((resolve, reject)=> {
            connection.query(`DELETE FROM product WHERE id='${id}'`, (err, result)=>{
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })    
        })
    },
   
}