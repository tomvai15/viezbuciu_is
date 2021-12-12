const Reservation = require("../models/Reservation");
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false, // use SSL
  auth: {
    user: "viesbuciuis@gmail.com",
    pass: "ViesbuciuIS123",
  },
  tls: {
    rejectUnauthorized: false,
  },
});
module.exports = {
  getReservations: function (req, res) {
    console.log(req.body);
    Reservation.getAll(req.con, req.params.id, function (err, rows) {
      if (err) {
        console.log(err);
        res.status(400).send({ message: "FAILED" });
      }
      res.send({ data: rows });
    });
  },
  getFoods: function (req, res) {
    console.log(req.body);
    Reservation.getAllFoodthis(req.con, req.params.id, function (err, rows) {
      if (err) {
        console.log(err);
        res.status(400).send({ message: "FAILED" });
      }
      res.send({ data: rows });
    });
  },
  getReservation: function (req, res) {
    Reservation.get(req.con, req.params.id, function (err, rows) {
      const user = rows[0];
      console.log(user);
      if (!user) {
        res.status(400).send({ message: "Reservation not found" });
        return;
      }
      res.send({ data: user });
    });
  },
  updateReservation: function (req, res) {
    Reservation.updateReservation(req.con, req.body, function (err, rows) {
      if (err) {
        console.log(err);
        res.status(400).send({ message: "Failed" });
      } else {
        res.send({ message: "Reservation updated" });
      }
    });
  },
  removeReservation: function (req, res) {
    Reservation.delete(req.con, req.body.id, function (err, rows) {
      if (err) {
        console.log(err);
        res.status(400).send({ message: "FAILED" });
      }
      res.send({ message: "Reservation deleted" });
    });
  },

  addReservation: function (req, res) {
    Reservation.addReservation(req.con, req.body, function (err, rows) {
      if (err) {
        console.log(err);
        res.status(400).send({ message: "Failed" });
      } else {

        res.send({ message: "Reservation added" });
        console.log(req.body)
        var mailOptions = {
          from: "viesbuciuis@gmail.com",
          to: req.body.email,
          subject: "Rezervacijos patvirtinimas",
          html: "<h1>Rezervacija patvirtinta</h1><p>Laukiame jūsų apsilankymo!</p>",
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      }
    });
    console.log("hi from controller");
  },
};
