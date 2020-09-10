const fs = require('fs');

const db = require("../models");
const File = db.file

// Upload a Multipart-File then saving it to MySQL database
exports.upload = (req, res) => {
  File.create({
    type: req.file.mimetype,
    name: req.file.originalname,
    data: req.file.buffer,
    main: req.body.main,
    projectId: req.body.projectId
  }).then((file) => {
    try {
      const Project = require("./project.controller.js")
      Project.plusOne(req, res);

      // exit node.js app
      res.status(201).send({
        id: file.id,
        name: file.name,
        type: file.type,
        main: file.main,
        createAt: new Date().toLocaleString()
      });
    } catch (e) {
      console.log(e);
      res.status(299).send({ 'err': e });
    }
  }).catch(e => {
    res.status(299).send(e);
  })

};

exports.deleteOne = (req, res) => {
  const id = req.params.id;
  const Project = db.project;
  File.findByPk(id).then(file => {
    if (file) {
      Project.findByPk(file.projectId).then(project => {
        if (project) {
          if (project.statusId < 5 && file.main == 0) {
            file.destroy().then(() => {
              project.update({ statusId: 2 }).then(()=>{
                res.send('2');
              }).catch(e => { res.status(299).send(e) });
            }).catch(e => {
              res.status(299).send("error");
            });
          }
          else
            if(project.statusId == 6 && file.main == 1)
            {
              file.destroy().then(() => {
                project.update({ statusId: 5 }).then(()=>{
                  res.status(298).send('5');
                }).catch(e => { res.status(299).send(e) });
              }).catch(e => {
                res.status(299).send("error");
              });
            }
        }
        else {
          res.status(299).send("dont found!");
        }
      }).catch(e => {
        res.status(299).send("error");
      });
    }
    else {
      res.status(299).send("dont found!");
    }
  }).catch(e => {
    res.status(299).send("error");
  });
  // File.destroy({ where: { id: id } }).then(d => { res.send("delete") }).catch(e => { res.status(299).send(e) })
}

exports.findByProject = (req, res) => {
  const id = req.params.id;
  File.findAll({ where: { projectId: id }, attributes: ['id', 'name', 'main', 'type', 'createAt'] }).then(d => { res.status(298).send(d) }).catch(e => { res.status(299).send(e) });
}


exports.getFileById = (req, res) => {
  const id = req.params.id, projectId = req.params.projectId;
  File.findOne({ where: { id: id, projectId: projectId } }).then(file => {
    if (file) {
      var fileData = new Buffer.from(file.data);
      res.write(fileData);
      res.end();
    }
    else
      res.status(299).send("0 rows");

  })
    .catch(e => { res.status(299).send("error!") });
}
