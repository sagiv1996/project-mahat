module.exports = app => {
    const accounts = require("../controllers/account.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", accounts.create);
    router.get("/:id/:password", accounts.login);
    router.put("/:id/:password", accounts.update);
    router.get("/find/:id/:type", accounts.find);
    router.get("/:type", accounts.findAllByType);
    router.delete("/:id", accounts.delete);
  /*
    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", tutorials.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", tutorials.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", tutorials.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);
  
    // Create a new Tutorial
    router.delete("/", tutorials.deleteAll);
  */
    app.use('/api/accounts', router);
  };