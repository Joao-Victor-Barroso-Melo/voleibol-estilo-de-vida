var curtidaModel = require("../models/curtidaModel");


function buscarCurtidaPorPostagem(req, res) {
    var idPostagem = req.params.idPostagem;

    curtidaModel.buscarCurtidaPorPostagem(idPostagem).then((resultado) => {
        if (resultado.length > 0) {

            res.status(200).json(resultado);
        } else {
            res.status(204).json([]);
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function validar(req, res) {
    var idPostagem = req.body.idPostagem;
    var idUsuario = req.body.idUsuario;
    var isCurtido = req.body.isCurtido

    curtidaModel.buscarCurtidaPorPostagemAndUsuario(idPostagem, idUsuario)
        .then(
            function (resultado) {
                if (resultado.length == 1) {
                    curtidaModel.atualizarCurtida(idPostagem, idUsuario, isCurtido)
                        .then((resultadoCurtida) => {
                            res.json(resultadoCurtida)
                        })
                } else if (resultado.length == 0) {
                    curtidaModel.adicionarCurtida(idPostagem, idUsuario, isCurtido)
                    .then((resultadoInsert) => {
                        res.json(resultadoInsert)
                    })
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao validar as curtidas: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function deletarCurtida(req, res) {
    var idPostagem = req.body.idPostagem;

    curtidaModel.deletarCurtida(idPostagem)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}



module.exports = {
    validar,
    deletarCurtida,
    buscarCurtidaPorPostagem
}