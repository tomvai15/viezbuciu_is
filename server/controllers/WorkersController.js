
const Worker = require("../models/Worker")
const User = require("../models/User")
var bcrypt = require("bcryptjs");
module.exports = {
  getWorkers: function(req, res) {
    Worker.getAll(req.con, function(err, rows) 
    {
      if (err)
      {
          console.log(err);
          res.status(400).send({ message:"FAILED"})
      }
      res.send({ data: rows })
    })
  },
  getWorker: function(req, res) {
    Worker.get(req.con, req.params.id,function(err, rows) 
    {
      const user = rows[0]
      if (!user) 
      {
        res.status(400).send({message: "Worker not found"});
        return;
      }
      if (user.role == 3)
      {
          Worker.getRezervationWorker(req.con, req.params.id,function(err, rows){
            let worker = rows[0]
            if (!worker) 
            {
              res.status(400).send({message: "failed"});
              return;
            }
            worker.workplace=1
            res.send({data: worker});
          }) 
      }
      else if (user.role == 4)
      {
        Worker.getKitchenWorker(req.con, req.params.id,function(err, rows){
          let worker = rows[0]
          if (!worker) 
          {
            res.status(400).send({message: "failed"});
            return;
          }
          worker.workplace=0
          res.send({data: worker});
        }) 
      }
      else
      {
        res.status(400).send({message: "Worker not found"});
      }
    })
  },
  removeWorker: function(req, res) {
    Worker.delete(req.con, req.body.id, function(err, rows) 
    {
      if (err)
      {
          console.log(err);
          res.status(400).send({ message:"FAILED"})
      }
      res.send({ message:"Worker deleted" })
    })
  },
  addWorker: function(req, res) {
    User.get(req.con, function(err, rows) 
    {
      const user = rows.find(element => element.el_pastas == req.body.email)
      if (user) 
      {
        res.status(400).send({message: "Failed! Email is already in use!"});
        return;
      }
      if (req.body.workplace==0)
      {
        Worker.createKitchenWorker(req.con,req.body, bcrypt.hashSync("qwerty", 8),function(err, rows){
          if (err)
          {
            console.log(err);
            res.status(400).send({message: "Failed"});
          }
          else
          {
            res.send({message: "Worker added"});
          }
        })
      }
      else if (req.body.workplace==1)
      {
        Worker.createRezervationWorker(req.con,req.body, bcrypt.hashSync("qwerty", 8),function(err, rows){
          if (err)
          {
            console.log(err);
            res.status(400).send({message: "Failed"});
          }
          else
          {
            res.send({message: "Worker added"});
          }
        })
      }
      else
      {
        res.status(400).send({message: "Incorrect workplace"});
        return;
      }

    });
  },

  updateWorker: function(req, res) {

    console.log(req.body)
    User.get(req.con, function(err, rows) 
    {
      const user = rows.find(element => element.el_pastas == req.body.email  )
      if (user && user.id_Naudotojas!=req.body.id) 
      {
        res.status(400).send({message: "Failed! Email is already in use!"});
        return;
      }
      if (req.body.workplace==0)
      {
        Worker.updateKitchenWorker(req.con,req.body,function(err, rows){
          if (err)
          {
            console.log(err);
            res.status(400).send({message: "Failed"});
          }
          else
          {
            res.send({message: "Worker updated"});
          }
        })
      }
      else if (req.body.workplace==1)
      {
        Worker.updateRezervationWorker(req.con,req.body,function(err, rows){
          if (err)
          {
            console.log(err);
            res.status(400).send({message: "Failed"});
          }
          else
          {
            res.send({message: "Worker updated"});
          }
        })
      }
      else
      {
        res.status(400).send({message: "Incorrect workplace"});
        return;
      }

    });
  },
}
