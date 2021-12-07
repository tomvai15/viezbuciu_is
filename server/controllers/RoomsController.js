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
};
