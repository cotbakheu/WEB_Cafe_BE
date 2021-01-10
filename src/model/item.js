const connection = require('../config/db');

module.exports = {
    //product model
    modelAllItems: (sort, page, search)=> {
        return new Promise ((resolve, reject)=> {
            connection.query(`SELECT product.name, product.price, product.date, category.category_name FROM product JOIN category ON product.id_category = category.id ${search} ${sort} ${page}`, (err, result)=>{
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
            connection.query(`INSERT INTO product (name, price, image, id_category) VALUES ('${data.name}','${data.price}','${data.image}', '${data.category}')`, (err, result)=>{
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
            connection.query(`UPDATE product SET name='${data.name}', price='${data.price}', image='${data.image}', id_category='${data.category}' WHERE id='${id}'`, (err, result)=>{
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
    //category
    modelAllCategory: (sort)=> {
        return new Promise ((resolve, reject)=> {
            connection.query(`SELECT * FROM category ${sort}`, (err, result)=>{
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
            connection.query(`INSERT INTO category (category_name) VALUES ('${data.category_name}')`, (err, result)=>{
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })    
        })
    },
    modelUpdateCategory: (data, id)=> {
        return new Promise ((resolve, reject)=> {
            connection.query(`UPDATE category SET category_name='${data.name}' WHERE id='${id}'`, (err, result)=>{
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })    
        })
    },
    modelDeleteCategory: (name)=> {
        return new Promise ((resolve, reject)=> {
            connection.query(`DELETE FROM category WHERE category_name='${name}'`, (err, result)=>{
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })    
        })
    },

    //history
    modelAllHistory: (sort)=> {
        return new Promise ((resolve, reject)=> {
            connection.query(`SELECT * FROM history ${sort}`, (err, result)=>{
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
            connection.query(`INSERT INTO history (invoice, cashier, product, amount) VALUES ('${data.invoice}','${data.cashier}','${data.product}','${data.amount}')`, (err, result)=>{
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
            connection.query(`UPDATE history SET cashier='${data.cashier}', product='${data.product}', amount='${data.amount} WHERE id='${id}'`, (err, result)=>{
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