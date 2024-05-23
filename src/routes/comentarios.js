var express = require("express");
var router = express.Router();

var comentarioController = require("../controllers/comentarioController");

router.get("listarComentarios/:idPostagem", function (req, res) {
    comentarioController.buscarComentarioPorPostagem(req, res);
});

router.post("/publicar", function (req, res) {
    comentarioController.publicar(req, res);
});

router.put("/editar", function (req, res) {
    postagemController.editar(req, res);
});

router.delete("/deletar", function (req, res) {
    postagemController.deletar(req, res);
});

module.exports = router;