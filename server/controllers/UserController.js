
const User = require("../models/User")
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");



module.exports = {
  index: function(req, res) {
    User.get(req.con, function(err, rows) {
      res.send({ data: rows })
    })
  },
  signup: function(req, res) {
    
    User.get(req.con, function(err, rows) 
    {
      const user = rows.find(element => element.el_pastas == req.body.email)
      if (user) 
      {
        res.status(400).send({message: "Failed! Email is already in use!"});
        return;
      }
      User.createClient(req.con,{
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        userName: req.body.userName,
        bank: req.body.bank,
        cvv: req.body.cvv,
        date: req.body.date,
        role: 2
      },function(err, rows){
        if (err)
        {
          console.log(err);
          res.status(400).send({message: "Failed"});
        }
        else
        {
          res.send({message: "OK"});
        }
      })
    });
  },
  signin: function (req, res) {

      User.getByEmail(req.con, req.body.email, function(err, rows)
      {
        if (err)
        {
          console.log("SQL ERROR");
          console.log(err);
        }  
        const user = rows[0];
        if (!user)
        {
          return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.slaptazodis
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        var token = jwt.sign({ id: user.id_Naudotojas }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
 
        res.status(200).send({
          id: user.id_Naudotojas,
          email: user.email,
          accessToken: token,
          role: user.role
        });
      })
    },
    getworkers: function (req, res) {
      res.send({data:"workers"})
    }

}
