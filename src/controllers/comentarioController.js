var comentarioModel = require("../models/comentarioModel");


function buscarComentarioPorPostagem(req, res) {
    var idPostagem = req.params.idPostagem;
  
    comentarioModel.buscarComentarioPorPostagem(idPostagem).then((resultado) => {
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

  function publicar(req, res) {
    var mensagem = req.body.mensagem;
    var idUsuario = req.body.usuario;
    var idPostagem = req.body.postagem;

    if (mensagem == undefined) {
        res.status(400).send("A mensagem está indefinido!");
    } else if (idUsuario == undefined) {
        res.status(400).send("O id do usuário está indefinido!");
    } else if (idPostagem == undefined) {
        res.status(403).send("O id da postagem está indefinido!");
    } else {
        comentarioModel.publicar(mensagem, idUsuario, idPostagem)
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

function deletarPorPostagem(req, res) {
  var idUsuario = req.body.idUsuario;
  var idPostagem = req.body.idPostagem;

  comentarioModel.deletarPorPostagem(idPostagem)
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
    publicar,
    deletarPorPostagem,
    buscarComentarioPorPostagem
}