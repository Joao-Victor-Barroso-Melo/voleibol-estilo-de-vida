var express = require("express");
var router = express.Router();

var comentarioController = require("../controllers/comentarioController");

router.get("listarComentarios/:idPostagem", function (req, res) {
    comentarioController.buscarComentarioPorPostagem(req, res);
});

router.post("/publicar", function (req, res) {
    comentarioController.publicar(req, res);
});


router.delete("/deletarPorPostagem", function (req, res) {
    comentarioController.deletarPorPostagem(req, res);
});

module.exports = router;