var express = require("express");
var router = express.Router();

var curtidaController = require("../controllers/curtidaController");

router.get("listarComentarios/:idPostagem", function (req, res) {
    curtidaController.buscarComentarioPorPostagem(req, res);
});

router.post("/publicar", function (req, res) {
    curtidaController.publicar(req, res);
});

router.put("/editar", function (req, res) {
    postagemController.editar(req, res);
});

router.delete("/deletarPorPostagem", function (req, res) {
    curtidaController.deletar(req, res);
});

module.exports = router;