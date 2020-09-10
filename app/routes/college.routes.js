module.exports = app => {
const colleges = require("../controllers/college.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", colleges.create);
  
    // Retrieve all Tutorials
    router.get("/", colleges.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", colleges.findOne);

    router.get("/pk/:id", colleges.findPk);
  /*
    // Update a Tutorial with id
    router.put("/:id", tutorials.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);
  
    // Delete all Tutorials
    router.delete("/", tutorials.deleteAll);
  */
    app.use('/api/colleges', router);
  };
  