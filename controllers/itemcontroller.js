var router = require("express").Router();
var sequelize = require("../db");
var Item = sequelize.import("../models/Item");

// create new item for user
router.post("/create", function(req, res) {
  if (!req.errors) {
    const itemFromRequest = {
      title: req.body.item.title,
      resource: req.body.item.resource,
      comment: req.body.item.comment,
      userId: req.user.id
    };
    Item.create(itemFromRequest)
      .then(item => res.status(200).json(item))
      .catch(err => res.json(req.errors));
  } else {
    res.status(500).json(req.errors);
  }
});

// get all items for user
router.get("/getall", (req, res) => {
  Item.findAll({
    where: {
      userId: req.user.id
    }
  })
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({ error: err }));
});

// edit item for user
router.put("/:id/update", (req, res) => {
  if (!req.errors) {
    Item.update(req.body.item, { where: { id: req.params.id } })
      .then(item => res.status(200).json(item))
      .catch(err => res.json(req.errors));
  } else {
    res.status(500).json(req.errors);
  }
});

// delete item for user
router.delete("/:id/delete", (req, res) => {
  Item.destroy({ where: { id: req.params.id } })
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
