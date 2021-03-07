const connection = require('../config/db');

module.exports = {
    //register
    modelReg: (data)=> {
        return new Promise ((resolve, reject)=> {
            connection.query(`INSERT INTO user SET ?`, data, (err, result)=>{
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })    
        })
    },
    //Email Checker
    modelCheck: (email)=> {
        return new Promise ((resolve, reject)=> {
            connection.query(`SELECT * FROM user WHERE email='${email}'`, (err, result)=>{
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })    
        })
    },
    modelUpdateUser: (data, id)=> {
        return new Promise ((resolve, reject)=> {
            connection.query(`UPDATE user SET ? WHERE id='${id}'`, data, (err, result)=>{
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })    
        })
    },
    modelDetail: (id)=> {
        return new Promise ((resolve, reject)=> {
            connection.query(`SELECT * FROM user WHERE id='${id}'`, data, (err, result)=>{
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })    
        })
    },
}