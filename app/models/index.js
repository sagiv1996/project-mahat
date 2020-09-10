
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  define: {
    timestamps: false
}
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.status = require("./status.model.js")(sequelize, Sequelize);

db.project = require("./project.model.js")(sequelize, Sequelize);
db.file = require("./file.model.js")(sequelize, Sequelize);
db.college = require("./college.model.js")(sequelize, Sequelize);
db.student = require("./student.model.js")(sequelize, Sequelize);
db.account = require("./account.model.js")(sequelize, Sequelize);
db.trend = require("./trend.model.js")(sequelize, Sequelize);
db.teacher = require("./teacher.model.js")(sequelize, Sequelize);
db.test = require("./test.model.js")(sequelize, Sequelize);


//forgien key 1:1

db.account.hasOne(db.college, {
  foreignKey: {
    allowNull: false,
    unique: true
  },
  onDelete:"CASCADE"
});

db.account.hasOne(db.student, {
  foreignKey: {
    allowNull: false,
    unique: true
  },
  onDelete:"CASCADE"
});

db.account.hasOne(db.teacher, {
  foreignKey: {
    allowNull: false,
    unique: true
  },
  onDelete:"CASCADE"
});
db.student.hasOne(db.project, {
  foreignKey: {
    allowNull: false,
    unique: true,
  },
  onDelete:"CASCADE"
});
db.project.hasOne(db.test, {
  foreignKey: {
    allowNull: false,
    unique: true
  },
  onDelete:"RESTRICT"
});

//forgien key 1:n
db.teacher.hasMany(db.student, {onDelete: "RESTRICT"});
db.college.hasMany(db.student, {onDelete: "CASCADE"});
db.college.hasMany(db.teacher, {onDelete: "CASCADE"});
db.trend.hasMany(db.student, {onDelete: "RESTRICT"});
db.project.hasMany(db.file, {onDelete: "CASCADE"});
db.status.hasMany(db.project, {
  foreignKey: {
    allowNull: false,    
    defaultValue: 2
  }
});





module.exports = db;