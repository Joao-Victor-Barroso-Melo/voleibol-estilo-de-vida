var express = require("express");
var router = express.Router();

var visualizacaoController = require("../controllers/visualizacaoController");

router.get("listarComentarios/:idPostagem", function (req, res) {
    visualizacaoController.buscarComentarioPorPostagem(req, res);
});

router.post("/adicionar", function (req, res) {
    visualizacaoController.adicionar(req, res);
});

router.delete("/deletarPorPostagem", function (req, res) {
    visualizacaoController.deletarPorPostagem(req, res);
});

module.exports = router;