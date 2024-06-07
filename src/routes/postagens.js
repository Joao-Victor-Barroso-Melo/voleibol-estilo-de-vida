var express = require("express");
var router = express.Router();

var postagemController = require("../controllers/postagemController");

router.post("/listarPagina", function (req, res) {
    postagemController.listarPorOffset(req, res);
});

router.post("/listarTodas", function (req, res) {
    postagemController.listarTodas(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    postagemController.listarPorUsuario(req, res);
});

router.get("/pegar/:idPostagem/:idUsuario", function (req, res) {
    postagemController.listarDadosPostagem(req, res);
});

router.get("/estatisticas/:idUsuario", function (req, res) {
    postagemController.listarEstatisticas(req, res);
});


router.get("/pesquisar/:descricao", function (req, res) {
    postagemController.pesquisarDescricao(req, res);
});

router.post("/publicar/:idUsuario", function (req, res) {
    postagemController.publicar(req, res);
});

router.put("/editar/:idPostagem", function (req, res) {
    postagemController.editar(req, res);
});

router.delete("/deletar", function (req, res) {
    postagemController.deletar(req, res);
});

module.exports = router;