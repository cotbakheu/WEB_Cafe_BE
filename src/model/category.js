const connection = require('../config/db');

module.exports = {
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
    modelPostCategory: (data)=> {
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
            connection.query(`UPDATE category SET category_name='${data.category_name}' WHERE id='${id}'`, (err, result)=>{
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })    
        })
    },
    modelDeleteCategory: (id)=> {
        return new Promise ((resolve, reject)=> {
            connection.query(`DELETE FROM category WHERE id='${id}'`, (err, result)=>{
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })    
        })
    },
}