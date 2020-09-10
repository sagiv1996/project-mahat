const { student } = require("../models/index.js");

module.exports = app => {
    const students = require("../controllers/student.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", students.create);
    router.get("/:id", students.findAllByCollege);
    router.put("/:id", students.update);
    router.get("/findOne/:id", students.findByAccountId)
  /*
    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", tutorials.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", tutorials.findOne);
  
    // Update a Tutorial with id
    
  
    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);
  
    // Create a new Tutorial
    router.delete("/", tutorials.deleteAll);
  */
    app.use('/api/students', router);
  };