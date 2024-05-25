var express = require("express");
var router = express.Router();

var visualizacaoController = require("../controllers/visualizacaoController");

router.get("listarComentarios/:idPostagem", function (req, res) {
    visualizacaoController.buscarComentarioPorPostagem(req, res);
});

router.post("/publicar", function (req, res) {
    visualizacaoController.publicar(req, res);
});

router.put("/editar", function (req, res) {
    postagemController.editar(req, res);
});

router.delete("/deletarPorPostagem", function (req, res) {
    visualizacaoController.deletar(req, res);
});

module.exports = router;