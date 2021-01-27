// skins.js

var express = require('express');
var router = express.Router();
var db = require('../database');

router.get("/all", function(req, res) {
    db.Skin.findAll()
        .then( skins => {
            res.status(200).send(JSON.stringify(skins));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.get("/:id", function(req, res) {
    db.Skin.findByPk(req.params.id)
        .then( Skin => {
            res.status(200).send(JSON.stringify(Skin));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.put("/", function(req, res) {
    db.Skin.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        id: req.body.id
        })
        .then( Skin => {
            res.status(200).send(JSON.stringify(Skin));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.delete("/:id", function(req, res) {
    db.Skin.destroy({
        where: {
            id: req.params.id
        }
        })
        .then( () => {
            res.status(200).send();
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

module.exports = router;