const Room = require("../models/Room");

module.exports = {
  getRooms: function (req, res) {
    Room.getAll(req.con, function (err, rows) {
      if (err) {
        console.log(err);
        res.status(400).send({ message: "FAILED" });
      }
      res.send({ data: rows });
    });
  },
  getRoom: function (req, res) {
    Room.get(req.con, req.params.id, function (err, rows) {
      const user = rows[0];
      if (!user) {
        res.status(400).send({ message: "Room not found" });
        return;
      }
      res.send({ data: user });
    });
  },
  removeRoom: function (req, res) {
    Room.delete(req.con, req.body.id, function (err, rows) {
      if (err) {
        console.log(err);
        res.status(400).send({ message: "FAILED" });
      }
      res.send({ message: "Room deleted" });
    });
  },

  addRoom: function (req, res) {
    Room.createRoom(req.con, req.body, function (err, rows) {
      if (err) {
        console.log(err);
        res.status(400).send({ message: "Failed" });
      } else {
        res.send({ message: "Room added" });
      }
    });
  },

  updateRoom: function (req, res) {
    Room.updateRoom(req.con, req.body, function (err, rows) {
      if (err) {
        console.log(err);
        res.status(400).send({ message: "Failed" });
      } else {
        res.send({ message: "Room updated" });
      }
    });
  },


  usedRooms: function (req, res) {

    Room.usedRooms(req.con, function (err, rows) {
      const count = rows[0];
      
      if (!count) {
        res.status(400).send({ message: "not found" });
        return;
      }
      res.send({ count: count });
    });
  },

  waitingRooms: function (req, res) {

    Room.waitingRooms(req.con, function (err, rows) {
      const count = rows[0];
      
      if (!count) {
        res.status(400).send({ message: "not found" });
        return;
      }
      res.send({ count: count });
    });
  },

  departure: function (req, res) {

    Room.departure(req.con, function (err, rows) {
      const count = rows[0];
      
      if (!count) {
        res.status(400).send({ message: "not found" });
        return;
      }
      res.send({ count: count });
    });
  },

  numOfRooms: function (req, res) {

    Room.numOfRooms(req.con, function (err, rows) {
      const count = rows[0];
      
      if (!count) {
        res.status(400).send({ message: "not found" });
        return;
      }
      res.send({ count: count });
    });
  },

  assignRoom: function (req, res) {
    Room.assignRoom(req.con, req.body, function (err, rows) {
      if (err) {
        console.log(err);
        res.status(400).send({ message: "FAILED" });
      }
      res.send({ message: "Room assigned" });
    });
  },

  getRoomsWithReservation: function (req, res) {
    Room.getRoomsWithReservation(req.con, function (err, rows) {
      if (err) {
        console.log(err);
        res.status(400).send({ message: "FAILED" });
      }
      res.send({ data: rows });
    });
  },

  getReservations: function (req, res) {
    Room.getReservations(req.con, function (err, rows) {
      if (err) {
        console.log(err);
        res.status(400).send({ message: "FAILED" });
      }
      res.send({ data: rows });
    });
  },
  getRoomsForAssign: function (req, res) {
    Room.getRoomsForAssign(req.con, req.params.type, req.params.beds, function (err, rows) {
      if (err) {
        console.log(err);
        res.status(400).send({ message: "FAILED" });
      }
      res.send({ data: rows });
    });
  },
};
