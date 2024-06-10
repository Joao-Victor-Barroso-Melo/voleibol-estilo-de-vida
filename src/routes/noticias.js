var express = require("express");
var router = express.Router();

var noticiaController = require("../controllers/noticiaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.get("/listar", function (req, res) {
    noticiaController.listar(req, res);
})

router.get("/listarPorQuantidade/:qtdNoticias", function (req, res) {
    noticiaController.listarPorQuantidade(req, res);
});



module.exports = router;