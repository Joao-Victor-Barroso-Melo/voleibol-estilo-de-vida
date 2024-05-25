var database = require("../database/config");

function buscarComentarioPorPostagem(idPostagem) {

    var instrucaoSql = `SELECT 
	c.idComentario,
    c.fkPostagem,
    c.fkUsuario,
    c.dataHora,
	c.mensagem,
    u.idUsuario,
    u.nome
	FROM 
	comentario as c
    JOIN postagem as p
    ON c.fkPostagem = p.idPostagem
    JOIN usuario as u
    ON c.fkUsuario = u.idUsuario
    WHERE p.idPostagem = ${idPostagem} ORDER BY c.dataHora DESC`;
  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

function publicar(mensagem, idUsuario, idPostagem) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", mensagem, idUsuario, idPostagem);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO comentario (fkPostagem, fkUsuario, mensagem, dataHora) 
        VALUES (${idPostagem},${idUsuario}, '${mensagem}', now());
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarPorPostagem(idPostagem) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idPostagem);
    var instrucaoSql = `
        DELETE FROM visualizacao WHERE fkPostagem = ${idPostagem};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    publicar,
    deletarPorPostagem,
    buscarComentarioPorPostagem
}
