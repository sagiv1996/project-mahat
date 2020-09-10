const db = require("../models");

const Test = db.test;
const Op = db.Sequelize.Op;

exports.create = (req, res)=>{
  /*
  const test = {
    projectId: req.body.projectId,
    date: req.body.date,
    time: req.body.time,
  }
  */
  Test.upsert(req.body).then(d=>{
    const Project = require("./project.controller.js")
      Project.plusOne(req, res);
      res.send(d)}).catch(e=>{res.send(e)})
};


exports.delete = (req, res) => {
  const id = req.params.id;

  Test.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};


exports.findByProject = (req, res) =>{
  const id = req.params.id;
  Test.findOne({where: {projectId: id}}).then(tests=>{
    res.status(298).send(tests);
  }).catch(()=>{res.status(299).send("לא נמצאו תוצאות")});
}