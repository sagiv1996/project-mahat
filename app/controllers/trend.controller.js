const db = require("../models");
const Trend = db.trend;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const trend = {
    name: req.body.name
  };

  // Save Tutorial in the database
  Trend.create(trend)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(299).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

exports.findAll = (req, res) => {

  Trend.findAll()
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

exports.findByPk = (req, res) => {
  const id = req.params.id;
  Trend.findByPk(id)
    .then(data => {
      res.send(data)
    })
};


exports.update = (req, res) => {
  const id = req.params.id;

  Trend.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "update " + num +" rows" 
        });
      } else {
        res.send({
          message: "dont empty"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "dont working"
      });
    });
};

exports.delete=(req, res) =>{
  id = req.params.id;
  Trend.destroy(
    {
      where: { id: id }
    }).then(num => {
      if (num == 1) {
        res.send({
          message: "delete"
        });
      } else {
        res.send({
          message: `dont found`
        });
      }
    })
    .catch(err => {
      res.status(299).send("שגיאה במחיקה. נא לוודא שלא קיימים תלמידים במגמה זו");
    });
}