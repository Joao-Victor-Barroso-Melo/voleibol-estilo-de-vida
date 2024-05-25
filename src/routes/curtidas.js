var express = require("express");
var router = express.Router();

var curtidaController = require("../controllers/curtidaController");

router.post("/buscarCurtida", function (req, res) {
    curtidaController.buscarCurtidaPorPostagemAndUsuario(req, res);
});

router.post("/validarCurtida", function (req, res) {
    curtidaController.validar(req, res);
});

router.put("/editar", function (req, res) {
    postagemController.editar(req, res);
});

router.delete("/deletarPorPostagem", function (req, res) {
    curtidaController.deletarCurtida(req, res);
});

module.exports = router;