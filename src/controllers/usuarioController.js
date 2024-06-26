var usuarioModel = require("../models/usuarioModel");
var postagemModel = require("../models/postagemModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);


                        // aquarioModel.buscarAquariosPorEmpresa(resultadoAutenticar[0].empresaId)
                        //     .then((resultadoAquarios) => {
                        //         if (resultadoAquarios.length > 0) {
                        res.json({
                            id: resultadoAutenticar[0].idUsuario,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome,
                            senha: resultadoAutenticar[0].senha,
                            fotoPerfil: resultadoAutenticar[0].fotoPerfil,
                        });
                        //     } else {
                        //         res.status(204).json({ aquarios: [] });
                        //     }
                        // })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;


    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarDadosUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {

        usuarioModel.listarDadosUsuario(idUsuario)
            .then(
                function (resultadoUsuario) {
                    console.log(`\nResultados encontrados: ${resultadoUsuario.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoUsuario)}`); // transforma JSON em String

                    if (resultadoUsuario.length == 1) {
                        console.log(resultadoUsuario);


                        postagemModel.listarPorUsuario(idUsuario)
                            .then((resultadoPostagens) => {
                                if (resultadoPostagens.length > 0) {
                                    res.json({
                                        dataUser: resultadoUsuario[0],
                                        postagens: resultadoPostagens
                                    });
                                } else {
                                    res.json({
                                        dataUser: resultadoUsuario[0],
                                        postagens: []
                                    });
                                }
                            })
                    } else if (resultadoUsuario.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function editar(req, res) {
    var idUsuario = req.params.idUsuario;

    const {nome, email, senha} = req.body

    let imagem = ''
    if (req.file != undefined) {
        imagem = req.file.filename;
    }

    if(imagem == ''){
        usuarioModel.editarSemFoto(nome, email, senha, idUsuario)
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
    }else {
        if (nome == undefined) {
            res.status(400).send("Seu nome está undefined!");
        } else if (email == undefined) {
            res.status(400).send("Seu email está undefined!");
        } else if (senha == undefined) {
            res.status(400).send("Sua senha está undefined!");
        } else {
            usuarioModel.editar(nome, email, senha, idUsuario, imagem)
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

   
    

}

module.exports = {
    autenticar,
    cadastrar,
    editar,
    listarDadosUsuario
}