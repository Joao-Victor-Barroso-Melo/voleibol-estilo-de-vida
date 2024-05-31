var express = require("express");
var router = express.Router();
const upload = require('../config/configUpload');
var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    usuarioController.listarDadosUsuario(req, res);
});

router.put("/editar/:idUsuario", upload.single('foto'), (req, res) => {
    usuarioController.editar(req, res);
});


module.exports = router;