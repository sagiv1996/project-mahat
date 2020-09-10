
module.exports = app => {
    const test = require("../controllers/test.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", test.create);
  
    // Retrieve all Tutorials
    router.delete("/:id", test.delete);
    router.get("/project/:id", test.findByProject);
  
    // Retrieve a single Tutorial with id
    //router.get("/:id", test.findByPk);
    //router.get("/college/:id", test.findByCollege);
    // Update a Tutorial with id
    //router.put("/:id", tutorials.update);
  
    // Delete a Tutorial with id
  //  router.delete("/:id", tutorials.delete);
  
    // Delete all Tutorials
    //router.delete("/", tutorials.deleteAll);
  
    app.use('/api/test', router);
  };
  