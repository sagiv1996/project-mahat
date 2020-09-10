const db = require("../models");

const Student = db.student;
const Op = db.Sequelize.Op;


exports.create = (req, res) => { 
    
    const student={
    accountId: req.body.id,
    teacherId: req.body.teacherId,
    collegeId: req.body.collegeId,
    trendId: req.body.trendId
};
const Account = require("./account.controller.js");
 Account.create(req,res).then(()=>{
     Student.create(student)
    .then((data)=>{
        res.status(201).send(data);
    })
    .catch(err => {
        res.status(299).send({err});
      });
 }).catch(err => {
    res.status(299).send({err});
  });
   
    


}

exports.findAllByCollege= (req, res)=>{
    const id = req.params.id;
    Student.findAll({where: {collegeId: id}}).then(d=>{res.status(298).send(d)}).catch({msg: "error!"})
}

exports.update= (req, res)=>{
    const id = req.params.id;
    Student.update(req.body, {where:{id:id}}).then(d=>{res.send(d)}).catch(e=>{res.status(299).send(e)})
}



exports.findByAccountId= (req, res)=>{
    const id = req.params.id;
    Student.findOne({where: {accountId: id}}).then(d=>{res.status(298).send(d)}).catch({msg: "error!"})
}