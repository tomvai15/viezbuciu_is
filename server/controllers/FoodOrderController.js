const FoodOrder = require("../models/FoodOrder");

module.exports = {
  getFoodOrders: function (req, res) {
    FoodOrder.getAll(req.con, req.params.id, function (err, rows) {
      if (err) {
        console.log(err);
        res.status(400).send({ message: "FAILED" });
      }
      res.send({ data: rows });
    });
  },
  getOrderDates: function (req, res) {
    FoodOrder.getOrderDates(req.con, req.params.id, function (err, rows) {
      if (err) {
        console.log(err);
        res.status(400).send({ message: "FAILED" });
      }
      res.send({ data: rows });
    });
  },
  getItems: function (req, res) {
    FoodOrder.getAllItems(req.con, function (err, rows) {
      if (err) {
        console.log(err);
        res.status(400).send({ message: "FAILED" });
      }
      res.send({ data: rows });
    });
  },
  getTypes: function (req, res) {
    FoodOrder.getAllTypes(req.con, function (err, rows) {
      if (err) {
        console.log(err);
        res.status(400).send({ message: "FAILED" });
      }
      res.send({ data: rows });
    });
  },  
  addFoodOrder: function (req, res) {
    FoodOrder.addFoodOrder(req.con, req.body, function (err, rows) {
      if (err) {
        console.log(err);
        res.status(400).send({ message: "Failed" });
      } else {
        res.send({ message: "Food order added" });
      }
    });
  },

};
