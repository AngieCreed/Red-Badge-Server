var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var Admin = sequelize.import("../models/Admin");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

router.post("/signup", function(req, res) {
  var username = req.body.admin.username;
  var firstname = req.body.admin.firstname;
  var lastname = req.body.admin.lastname;
  var email = req.body.admin.email;
  var pass = req.body.admin.password;

  Admin.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    username: username,
    password: bcrypt.hashSync(pass, 10)
  }).then(
    function createSuccess(admin) {
      var token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
      });

      res.json({
        admin: admin,
        message: "created",
        sessionToken: token
      });
    },
    function createError(err) {
      res.send(500, err.message);
    }
  );
});

router.post("/login", function(req, res) {
  User.findOne({ where: { username: req.body.admin.username } }).then(
    user => {
      if (user) {
        bcrypt.compare(
          req.body.admin.password,
          user.password,
          (err, matches) => {
            if (matches) {
              let token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24
              });
              res.json({
                admin: admin,
                message: "successfully authenticated",
                sessionToken: token
              });
            } else {
              res.status(502).send({ error: "bad gateway" });
            }
          }
        );
      } else {
        res.status(500).send({ error: "failed to authenticate" });
      }
    },
    err => res.status(501).send({ error: "failed to process" })
  );
});

module.exports = router;
