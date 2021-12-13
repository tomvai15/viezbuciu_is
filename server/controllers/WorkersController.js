
const Worker = require("../models/Worker")
const User = require("../models/User")
var bcrypt = require("bcryptjs");

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

console.log(makeid(5));


module.exports = {

  
  getWorkers: function(req, res) {
    let workplace = '';
    if (req.query.workplace)
    {
      if (req.query.workplace==1)
      {
        workplace="v_darbuotojas";
      }
      if (req.query.workplace==2)
      {
        workplace="r_darbuotojas";
      }
    }
    Worker.getAll(req.con,workplace, function(err, rows) 
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
          res.status(400).send({ message:"Nepavyko pašalinti darbuotojo"})
          return
      }
      res.send({ message:"Darbuotojas pašalintas" })
    })
  },
  addWorker: function(req, res) {

    User.get(req.con, function(err, rows) 
    {
      const user = rows.find(element => element.el_pastas == req.body.email)
      if (user) 
      {
        res.status(400).send({message: "Klaida: nurodytas el.paštas jau naudojamas"});
        return;
      }
      if (req.body.workplace==0)
      {
        const password = makeid(8)
        Worker.createKitchenWorker(req.con,req.body, bcrypt.hashSync(password, 8),function(err, rows){
          if (err)
          {
            console.log(err);
            res.status(400).send({message: "Nenumatyta klaida"});
          }
          else
          {
            res.send({message: "Worker added", password:password});
          }
        })
      }
      else if (req.body.workplace==1)
      {
        const password = makeid(8)
        Worker.createRezervationWorker(req.con,req.body, bcrypt.hashSync(password, 8),function(err, rows){
          if (err)
          {
            console.log(err);
            res.status(400).send({message: "Nenumatyta klaida"});
          }
          else
          {
            res.send({message: "Worker added", password:password});
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
        res.status(400).send({message: "Klaida: nurodytas el.paštas jau naudojamas"});
        return;
      }
      if (req.body.workplace==0)
      {
        Worker.updateKitchenWorker(req.con,req.body,function(err, rows){
          if (err)
          {
            console.log(err);
            res.status(400).send({message: "Nenumatyta klaida"});
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
            res.status(400).send({message: "Nenumatyta klaida"});
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
