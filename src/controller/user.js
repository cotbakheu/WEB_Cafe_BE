const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { modelCheck,
        modelReg,
        modelUpdateUser} = require('../model/user');

const { failed,
        success } = require('../helper/response');

module.exports = {
    login: (req, res) => {
        const body = req.body;
        modelCheck(body.email).then(async(response) => {
          if(response.length === 1){
            const checkPassword = await bcrypt.compare(body.password, response[0].password);
            if(checkPassword){
              const userData = {
                id: response[0].id,
                email: response[0].email,
                access: response[0].access
              };
              const token = jwt.sign(userData, process.env.JWT_SECRET);
              res.json({
                message: 'login successful',
                token
              });
            }else{
              res.json({
                message: 'Wrong password, try again'
              });
            }
          }else{
            res.json({
                message: "Email hasn't been registered"
            });
          }
        }).catch((err) => {
            failed(res, "Server Error", err)
        })
    },
    register: (req,res) => {
        const body = req.body;
        modelCheck(body.email).then(async(response) => {
            if (response.length >= 1) {
                res.json({
                    message: 'Email has been registered'
                });
            } else {
                const salt = await bcrypt.genSalt();
                const password = await bcrypt.hash(body.password, salt);
                const user = {
                    email: body.email,
                    first_name: body.first_name,
                    last_name: body.last_name,
                    access: body.access,
                    password
                };
                modelReg(user).then((response) => {
                    success(res, 'Register Succesful', {}, user);
                  }).catch((err)=>{
                    failed(res, "Server Error", err)
                });
            }
        }).catch((err)=>{
            failed(res, "Server Error", err)
        })
    },
    updateUser : async(req,res)=>{
        const id = req.params.id;
        const data = req.body;
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(data.password, salt);
        const user = {
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            access: data.access,
            password
        };
        modelUpdateUser(user, id)
        .then((response)=> {
            success(res, 'Succesful Update Data')
        }).catch((err)=>{
            failed(res, "Server Error", err)
        })
    },
}