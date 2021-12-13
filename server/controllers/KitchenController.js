const Kitchen = require("../models/Kitchen");

module.exports = {
  getMenu: function (req, res) {
    Kitchen.getMenu(req.con, function (err, rows) {
      if (err) {
        console.log(err);
        res.status(400).send({ message: "FAILED" });
      }
      res.send({ data: rows });
    });
  },
  getMenuItem: function (req, res) {
    Kitchen.getMenuItem(req.con, req.params.id, function (err, rows) {
      const menuItem = rows[0];
      if (!menuItem) {
        res.status(400).send({ message: "Menu item not found" });
        return;
      }
      res.send({ data: menuItem });
    });
  },
  addMenuItem: function (req, res) {
    Kitchen.addMenuItem(req.con, req.body, function (err, rows) {
      if (err) {
        console.log(err);
        res.status(400).send({ message: "Failed" });
      } else {
        res.send({ message: "Menu item added" });
      }
    });
  },
  updateMenuItem: function (req, res) {
    Kitchen.updateMenuItem(req.con, req.body, function (err, rows) {
      if (err) {
        console.log(err);
        res.status(400).send({ message: "Failed" });
      } else {
        res.send({ message: "Menu item updated" });
      }
    });
  },
  removeMenuItem: function(req, res) {
    Kitchen.removeMenuItem(req.con, req.body.id, function(err, rows) 
    {
      if (err)
      {
          console.log(err);
          res.status(400).send({ message:"FAILED"})
      }
      res.send({ message:"Menu item deleted" })
    })
  },
};