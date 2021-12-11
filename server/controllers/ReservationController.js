const Reservation = require("../models/Reservation");

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
      console.log(user)
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
        res.send({ message: "Room updated" });
      }
    });
  },
//   removeRoom: function (req, res) {
//     Room.delete(req.con, req.body.id, function (err, rows) {
//       if (err) {
//         console.log(err);
//         res.status(400).send({ message: "FAILED" });
//       }
//       res.send({ message: "Room deleted" });
//     });
//   },

//   addRoom: function (req, res) {
//     Room.createRoom(req.con, req.body, function (err, rows) {
//       if (err) {
//         console.log(err);
//         res.status(400).send({ message: "Failed" });
//       } else {
//         res.send({ message: "Room added" });
//       }
//     });
//   },


};
