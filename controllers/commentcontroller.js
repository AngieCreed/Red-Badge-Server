var router = require("express").Router();
var sequelize = require("../db");
var Comment = sequelize.import("../models/Comment");

// create new comment for user
router.post("/create", function(req, res) {
  if (!req.errors) {
    const commentFromRequest = {
      title: req.body.comment.title,
      content: req.body.comment.content,
      userId: req.user.id
    };
    Comment.create(commentFromRequest)
      .then(comment => res.status(200).json(comment))
      .catch(err => res.json(req.errors));
  } else {
    res.status(500).json(req.errors);
  }
});

// get all comments
router.get("/getalltotal", (req, res) => {
  Comment.findAll()
    .then(comment => res.status(200).json(comment))
    .catch(err => res.status(500).json({ error: err }));
});

// get all comments for user
router.get("/getall", (req, res) => {
  Comment.findAll({
    where: {
      userId: req.user.id
    }
  })
    .then(comment => res.status(200).json(comment))
    .catch(err => res.status(500).json({ error: err }));
});

// edit comment for user
router.put("/:id/update", (req, res) => {
  if (!req.errors) {
    Comment.update(req.body.comment, { where: { id: req.params.id } })
      .then(comment => res.status(200).json(comment))
      .catch(err => res.json(req.errors));
  } else {
    res.status(500).json(req.errors);
  }
});

// delete comment for user
router.delete("/:id/delete", (req, res) => {
  Comment.destroy({ where: { id: req.params.id } })
    .then(comment => res.status(200).json(comment))
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
