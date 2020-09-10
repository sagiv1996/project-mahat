
module.exports = app => {
    const teachers = require("../controllers/teacher.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", teachers.create);
  
    // Retrieve all Tutorials
    router.get("/", teachers.findAll);
  
    // Retrieve all published Tutorials
    //router.get("/published", tutorials.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", teachers.findByPk);
    router.get("/college/:id", teachers.findByCollege);
    router.get("/findOne/:id", teachers.findOne);
    // Update a Tutorial with id
    router.put("/:id", teachers.update);
  
    // Delete a Tutorial with id
  //  router.delete("/:id", tutorials.delete);
  
    // Delete all Tutorials
    //router.delete("/", tutorials.deleteAll);
  
    app.use('/api/teachers', router);
  };
  