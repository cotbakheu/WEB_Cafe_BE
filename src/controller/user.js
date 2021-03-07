const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { modelCheck,
        modelReg,
        modelUpdateUser,
        modelDetail} = require('../model/user');

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
              success(res, 'login Succes', {}, {token,id: response[0].id, email: response[0].email, access: response[0].access})
            }else{
              failed(res, 'Wrong Password')
            }
          }else{
            failed(res, 'Email not valid')
          }
        }).catch((err) => {
            failed(res, "Server Error", err)
        })
    },
    register: (req,res) => {
        const body = req.body;
        modelCheck(body.email).then(async(response) => {
            if (response.length >= 1) {
                failed(res, 'Email already registered')
            } else {
                const salt = await bcrypt.genSalt();
                const password = await bcrypt.hash(body.password, salt);
                const user = {...body, password}
                modelReg(user).then((response) => {
                    success(res, 'Register Succesful', {}, user);
                  }).catch((err)=>{
                    console.log(err)
                    failed(res, "Server Error", err)
                });
            }
        }).catch((err)=>{
            failed(res, "Server Error", err)
        })
    },
    updateUser : async(req,res)=>{
        const id = req.params.id;
        const body = req.body;
        const detail = await modelDetail(id)
        if (body.password) {
          const checkPassword = await bcrypt.compare(body.password, detail.password);
          if (checkPassword) {
            const salt = await bcrypt.genSalt();
            const password = await bcrypt.hash(body.password, salt);
            const user = {
              password,              
            }
            modelUpdateUser(user, id)
            .then((response)=> {
                success(res, 'Succesful Update User', {}, response)
            }).catch((err)=>{
                failed(res, "Server Error", err)
            })    
          }
        } else if (req.file) {
          const data = { ...body, image: req.file.filename};
          if (detail.image === 'default_photo.png') {
              modelUpdate(data, id)
                  .then((response) => {
                      success(res, response, {}, 'Update User success')
                  }).catch((err) => {
                      failed(res, 'Update User Failed!', err.message)
                  })
          } else {
              const path = `./public/images/${detail.image}`
              fs.unlinkSync(path)
              modelUpdate(data, id)
              .then((response) => {
                  success(res, response, {}, 'Update User success')
              }).catch(() => {
                  failed(res, 'Update user User Failed', err.message)
              })
          }
        }
    },
}