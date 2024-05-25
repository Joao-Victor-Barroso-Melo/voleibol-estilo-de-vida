var database = require("../database/config");

function buscarCurtidaPorPostagemAndUsuario(idPostagem, idUsuario) {

    var instrucaoSql = `SELECT * FROM curtida WHERE fkPostagem = ${idPostagem} AND fkUsuario = ${idUsuario};`;
  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

function adicionarCurtida(idPostagem, idUsuario, isCurtido) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", idPostagem, idUsuario, isCurtido);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
    INSERT INTO curtida (fkPostagem, fkUsuario, isCurtido, dataHora) VALUES 
	(${idPostagem}, ${idUsuario}, ${isCurtido}, now());
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarCurtida(idPostagem, idUsuario, isCurtido) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", idPostagem, idUsuario, isCurtido);
    var instrucaoSql = `
    UPDATE curtida SET isCurtido = ${isCurtido}, dataHora = now() WHERE fkPostagem = ${idPostagem} AND fkUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarCurtida(idPostagem) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idPostagem);
    var instrucaoSql = `
        DELETE FROM curtida WHERE fkPostagem = ${idPostagem};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    adicionarCurtida,
    deletarCurtida,
    atualizarCurtida,
    buscarCurtidaPorPostagemAndUsuario
}
