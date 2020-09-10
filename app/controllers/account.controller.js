const db = require("../models");
const { account } = require("../models");
const Account = db.account;
const Op = db.Sequelize.Op;



exports.create = async (req, res) => {
  //create random password

  var pass = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$*';
  var charactersLength = characters.length;
  var length = Math.floor(Math.random() * 10) + 6;
  for (var i = 0; i < length; i++) {
    pass += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  const account = {
    id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    sex: req.body.sex,
    password: pass,
    phone: req.body.phone,
    type: req.body.type,
    addres: req.body.addres
  };


  if (req.body.type === 'worker' || req.body.type === 'examine') {
    Account.create(account, { attributes: ['id', 'firstName', 'lastName', 'email', 'sex', 'addres', 'phone'] }).then(account => {
      try {
        const mail = require("./mail.controller.js");
        mail.sendMail(account.email, "הרשמתך להט אושרה בהצלחה!", "פרטי ההתחברות הם המספר זהות שלך + סיסמא  "+ pass);
        res.status(201).send(account);
      } catch (error) {
        res.status(299).send("שגיאה בשליחת מייל");
      }
      

      //res.status(201).send(account)
    }).catch(e => { res.status(299).send(e) })
  }
  else {
    await Account.create(account)
    const mail = require("./mail.controller.js");
    mail.sendMail(account.email, "הרשמתך להט אושרה בהצלחה!", "פרטי ההתחברות הם המספר זהות שלך + סיסמא  "+ pass);
  }
}


// Find a single Tutorial with an id
exports.login = (req, res) => {

  const id = req.params.id;
  const password = req.params.password;
  Account.findByPk(id).then(user => {
    if (user) {
      const bcrypt = require('bcrypt');
      bcrypt.compare(password, user.password, (err, data) => {
        if (err)
          res.status(299).send("שגיאה לא ידועה" + err);
        //if both match than you can do anything
        if (data) {
          let temp = false;
          switch (user.type) {
            case 'student':
              temp = db.student;
              break;
            case 'teacher':
              temp = db.teacher
              break;
            case 'college':
              temp = db.college
              break;
          };
          if (temp) {
            temp.findOne({ where: { accountId: user.id } }).then(user2 => {
              if (user2) {
                res.status(298).send([
                  {
                    id: user.id,
                    fullName: user.firstName + ' ' + user.lastName,
                    type: user.type
                  }, user2]);
              } else res.status(299).send("נתונים שגויים");


            })
          }
          else {
            res.status(298).send([{
              id: user.id,
              fullName: user.firstName + ' ' + user.lastName,
              type: user.type
            }]);
          }
        } else {
          res.status(299).send("נתונים שגויים");
        }
      })
    }
    else {
      res.status(299).send("נתונים שגויים");
    }
  })
};

exports.update = (req, res) => {
  const id = req.params.id;
  const password = req.params.password;
  Account.findByPk(id).then(account => {
    if (account) {
      const bcrypt = require('bcrypt');
      bcrypt.compare(password, account.password, (err, data) => {
        if (err) res.status(299).send("שגיאה לא ידועה" + err);
        if (data) {
          account.update(req.body).then(() => {
            res.send("עודכן בהצלחה");
          }).catch(() => {
            res.status(299).send("שגיאה בעדכון");
          })
        }
        else res.status(299).send("פרטי זיהוי שגויים");
      })
    }
    else res.status(299).send("פרטי זיהוי שגויים");
  }).catch(e => { res.status(298).send("שגיאה לא ידועה") });
};


exports.find = async (req, res) => {
  const type = req.params.type;
  const id = req.params.id;
  let temp = false;
  switch (type) {
    case 'student':
      temp = db.student
      break;
    case 'teacher':
      temp = db.teacher
      break;
    case 'college':
      temp = db.college
      break;

  }
  if (temp) {
    Account.findOne({ where: { type: type }, include: [{ model: temp, where: { id: id }, attributes: null }] }).then(account => {
      res.status(298).send({
        fullName: account.firstName + " " + account.lastName,
        email: account.email,
        phone: account.phone
      });
    }).catch(e => {
      res.status(299).send("שגיאה");
    })
  }
}

exports.findAllByType = (req, res) => {
  const type = req.params.type;
  Account.findAll({ where: { type: type }, attributes: ['id', 'firstName', 'lastName', 'email', 'sex', 'phone', 'addres'] }).then(accounts => {
    res.status(298).send(accounts);
  }).catch(() => {
    res.status(299).send("לא נמצאו רשומות תואמות");
  })
}


exports.delete = (req, res) => {
  const id = req.params.id;
  Account.destroy({ where: { id: id } }).then(account => {
    if (account == 1) res.send("נמחק בהצלחה");
    else res.status(299).send("לא נמצאו רשומות למחיקה");
  }).catch(e => { res.status(299).send("שגיאה לא ידועה") });
}