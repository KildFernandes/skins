// skins.js

var express = require('express');
var router = express.Router();
var db = require('../database');

router.get("/all", function(req, res) {
    db.skin.findAll()
        .then( skins => {
            res.status(200).send(JSON.stringify(skins));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.get("/:id", function(req, res) {
    db.skin.findByPk(req.params.id)
        .then( Skin => {
            res.status(200).send(JSON.stringify(Skin));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.put("/", function(req, res) {
    db.skin.create({
        name: req.body.name,
        tipo: req.body.tipo,
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
    db.skin.destroy({
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