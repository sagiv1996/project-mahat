const db = require("../models");
const College = db.college;
const Op = db.Sequelize.Op;

exports.create= (req, res)=>{
const college = {
    name: req.body.name,
    addres: req.body.addres,
    phone: req.body.phone,
    email: req.body.email,
    accountId: req.body.id
};
const Account = require("./account.controller.js");
Account.create(req,res).then(()=>{
  College.create(college, {attributes: ['id', 'name', 'addres', 'phone', 'email']})
    .then((data)=>{
        res.status(201).send(data)
    }).catch(e=>{
      res.status(299).send("שגיאה ביצירת")
    })
}).catch(e=>{res.status(299).send("שגיאה בהכנסת רשומה")});
    

}

exports.findAll = (req, res) => {
  
    College.findAll()
      .then(data => {
        res.status(298).send(data);
      })
      .catch(err => {
        res.status(299).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };


exports.findOne = (req, res)=>{
    const id = req.params.id;
    College.findOne({where: {accountId: id}}).then(data=>{res.status(298).send({data})}).catch(err => {
        res.status(299).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    })}


    exports.findPk = (req, res ) =>{
      const id = req.params.id;
      College.findByPk(id).then(d=>{res.status(298).send(
        {
          name: d.name,
          addres: d.addres,
          phone: d.phone,
          email: d.email
        })}).catch(e=>{res.status(299).send(e)})
    }

