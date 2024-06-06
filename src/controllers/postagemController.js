var postagemModel = require("../models/postagemModel");
var comentarioModel = require("../models/comentarioModel");
var curtidaModel = require("../models/curtidaModel");
var visualizacaoModel = require("../models/visualizacaoModel");

function listar(req, res) {
    let ordemList = req.body.ordemList
    if(ordemList == "#"){
        ordemList = 'p.dataHora'
    }
    postagemModel.listar(ordemList).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function listarPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    postagemModel.listarPorUsuario(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listarEstatisticas(req, res) {
    var idUsuario = req.params.idUsuario;

    postagemModel.listarEstatisticas(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listarDadosPostagem(req, res) {
    var idPostagem = req.params.idPostagem;
    var idUsuario = req.params.idUsuario;

    let comentarios = []
    let curtidas = []
    postagemModel.listarDadosPostagem(idPostagem)
        .then(
            async function (resultado) {
                if (resultado.length == 1) {
                    await comentarioModel.buscarComentarioPorPostagem(idPostagem)
                        .then((resultadoComentarios) => {
                            if (resultadoComentarios.length > 0) {
                                comentarios = resultadoComentarios
                            }else{
                                comentarios = [];
                            }
                        })
                    await curtidaModel.buscarCurtidaPorPostagemAndUsuario(idPostagem, idUsuario)
                        .then(resultadoCurtida => {
                            if (resultadoCurtida.length == 1) {
                                curtidas = resultadoCurtida
                            } else {
                                curtidas = []
                            }
                        })
                    
                    res.json({
                        postagem: resultado,
                        curtidas: curtidas,
                        comentarios: comentarios
                    })

                } else {
                    res.status(403).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}


function pesquisarDescricao(req, res) {
    var descricao = req.params.descricao;

    postagemModel.pesquisarDescricao(descricao)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function publicar(req, res) {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var idUsuario = Number(req.params.idUsuario);

    if (titulo == undefined) {
        res.status(400).send("O título está indefinido!");
    } else if (descricao == undefined) {
        res.status(400).send("A descrição está indefinido!");
    } else if (idUsuario == undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else {
        postagemModel.publicar(titulo, descricao, idUsuario)
            .then(
                function (resultado) {

                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function editar(req, res) {
    var novoAssunto = req.body.assunto;
    var novaDescricao = req.body.descricao;
    var idPostagem = req.params.idPostagem;

    postagemModel.editar(novoAssunto, novaDescricao, idPostagem)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function deletar(req, res) {
    var idPostagem = req.body.idPostagem;

    visualizacaoModel.deletarPorPostagem(idPostagem)
        .then(
            function (resultadoDelVisualizacao) {
                curtidaModel.deletarCurtida(idPostagem)
                    .then(
                        function (resultadoDelCurtida) {
                            comentarioModel.deletarPorPostagem(idPostagem)
                                .then(
                                    function (resultadoDelComentarios) {
                                        postagemModel.deletar(idPostagem)
                                            .then(
                                                function (resultadoDelPostagem) {

                                                    res.json(resultadoDelPostagem);

                                                }
                                            )
                                    }
                                )
                        }
                    )
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
    listar,
    listarPorUsuario,
    pesquisarDescricao,
    publicar,
    editar,
    deletar,
    listarDadosPostagem,
    listarEstatisticas
}