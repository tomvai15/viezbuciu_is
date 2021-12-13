const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const User = require("../models/User")
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err)
    {
        return res.status(401).send({message: "Unauthorized!"});
    }
    req.userId = decoded.id;
    next();
  });
};
isAdmin = (req, res, next) => {

    User.getById(req.con, req.userId, function(err, rows)
    {
      if (err)
      {
        console.log(err);
      }
      const user = rows[0];
      if (user.role==1)
      {
        next();
      }
      else
      {
        res.status(403).send({
            message: "Require Admin Role!"
          });
          return;
      }   
    })
  };

  isReception = (req, res, next) => {

    User.getById(req.con, req.userId, function(err, rows)
    {
      if (err)
      {
        console.log(err);
      }
      const user = rows[0];
      if (user.role==3)
      {
        next();
      }
      else
      {
        res.status(403).send({
            message: "Require Receptionist Role!"
          });
          return;
      }   
    })
  };

isKitchen = (req, res, next) => {

  User.getById(req.con, req.userId, function(err, rows)
  {
    if (err)
    {
      console.log(err);
    }
    const user = rows[0];
    if (user.role==4)
    {
      next();
    }
    else
    {
      res.status(403).send({
          message: "Require Kitchen Role!"
        });
        return;
    }   
  })
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isReception: isReception,
    isKitchen: isKitchen
};
module.exports = authJwt;