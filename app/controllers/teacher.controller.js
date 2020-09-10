const db = require("../models");
const Teacher = db.teacher;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const teacher = {
        out: req.body.out,
        adocation: req.body.adocation,
        accountId: req.body.id,
        collegeId: req.body.collegeId
    };
    const Account = require("./account.controller.js");
    Account.create(req,res).then(()=>{
        Teacher.create(teacher).then(d => { res.status(201).send(d) }).catch(e => { res.status(299).send(e) });
    }).catch(e => { res.status(299).send(e) });
    
}

exports.findByPk = (req, res) => {
    const id = req.body.id;

    Teacher.findByPk(id).then(d => { res.status(298).send(d) }).catch(e=>{res.status(299).send(e)})
}
exports.findByCollege = (req, res) => {
    const id = req.params.id;
    Teacher.findAll({ where: { collegeId: id } }).then(data => { res.status(298).send(data) }).catch(e=>{res.status(299).send(e)});
}

exports.findAll = (req, res) => {
    Teacher.findAll().then(d => { res.send(d) })
}


exports.update = (req, res) => {
    const id = req.params.id;
    Teacher.update(req.body, { where: { id: id } }).then(d => { res.send(d) }).catch(res.send('e'))
}

exports.findOne = (req, res) =>{
    const id = req.params.id;
    Teacher.findOne({where: {accountId: id}}).then(d=>{res.send(d)}).catch(e=>{res.status(299).send(e)});
}