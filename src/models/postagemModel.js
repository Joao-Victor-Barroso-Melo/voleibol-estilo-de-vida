var database = require("../database/config");

function listar() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
    SELECT 
            p.idPostagem,
            p.assunto,
            p.fkUsuario,
            p.dataHora,
            u.idUsuario,
            u.nome,
            u.fotoPerfil,
			(SELECT count(idComentario) FROM comentario JOIN postagem ON fkPostagem = idPostagem WHERE fkPostagem = p.idPostagem) as qtdComentarios,
			(SELECT COALESCE(sum(isCurtido), 0) FROM curtida JOIN postagem ON fkPostagem = idPostagem WHERE fkPostagem = p.idPostagem) as qtdCurtidas,
            (SELECT count(idVisualizacao) FROM visualizacao JOIN postagem ON fkPostagem = idPostagem WHERE fkPostagem = p.idPostagem) as qtdVisualizacoes
            FROM postagem p
                JOIN usuario u
                ON p.fkUsuario = u.idUsuario ORDER BY p.dataHora DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pesquisarDescricao(texto) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarDescricao()");
    var instrucaoSql = `
        SELECT 
            a.id AS idAviso,
            a.titulo,
            a.descricao,
            a.fk_usuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
        FROM aviso a
            INNER JOIN usuario u
                ON a.fk_usuario = u.id
        WHERE a.descricao LIKE '${texto}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorUsuario(idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucaoSql = `
    SELECT 
        p.idPostagem,
        p.assunto,
        p.descricao,
        p.fkUsuario,
        p.dataHora,
        u.nome,
        (SELECT count(idComentario) FROM comentario JOIN postagem ON fkPostagem = idPostagem WHERE fkPostagem = p.idPostagem) as qtdComentarios,
		(SELECT COALESCE(sum(isCurtido), 0) FROM curtida JOIN postagem ON fkPostagem = idPostagem WHERE fkPostagem = p.idPostagem) as qtdCurtidas,
        (SELECT count(idVisualizacao) FROM visualizacao JOIN postagem ON fkPostagem = idPostagem WHERE fkPostagem = p.idPostagem) as qtdVisualizacoes
    FROM postagem p
        INNER JOIN usuario u
            ON p.fkUsuario = u.idUsuario
            WHERE p.fkUsuario = ${idUsuario}
            ORDER BY p.dataHora DESC
            ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarEstatisticas(idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucaoSql = `
    SELECT 
    a.data_formatada,
	a.total_postagens,
    a.total_comentarios,
    a.total_visualizacoes,
    COALESCE(b.total_curtida, 0) AS total_curtida
FROM (
    SELECT 
        DATE_FORMAT(p.dataHora, '%d/%m/%y') AS data_formatada,
        COUNT(DISTINCT p.idPostagem) AS total_postagens,
        COUNT(DISTINCT c.idComentario) AS total_comentarios,
        COUNT(DISTINCT v.idVisualizacao) AS total_visualizacoes
    FROM postagem p
    LEFT JOIN comentario c ON c.fkPostagem = p.idPostagem
    LEFT JOIN visualizacao v ON v.fkPostagem = p.idPostagem
    JOIN usuario u ON p.fkUsuario = u.idUsuario
    WHERE u.idUsuario = ${idUsuario}
    GROUP BY data_formatada
) a
LEFT JOIN (
    SELECT 
        DATE_FORMAT(p.dataHora, '%d/%m/%y') AS data_formatada,
        COALESCE(SUM(isCurtido), 0) AS total_curtida
    FROM postagem p
    LEFT JOIN curtida cu ON cu.fkPostagem = p.idPostagem
    JOIN usuario u ON p.fkUsuario = u.idUsuario
    WHERE u.idUsuario = ${idUsuario}
    GROUP BY data_formatada
) b ON a.data_formatada = b.data_formatada ORDER BY a.data_formatada DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarDadosPostagem(idPostagem) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucaoSql = `
        SELECT 
        p.idPostagem,
        p.assunto,
        p.descricao,
        p.fkUsuario,
        p.dataHora,
        u.idUsuario,
        u.nome,
        u.fotoPerfil,
        (SELECT count(idComentario) FROM comentario JOIN postagem ON fkPostagem = idPostagem WHERE fkPostagem = p.idPostagem) as qtdComentarios,
        (SELECT COALESCE(sum(isCurtido), 0) FROM curtida JOIN postagem ON fkPostagem = idPostagem WHERE fkPostagem = p.idPostagem) as qtdCurtidas,
        (SELECT count(idVisualizacao) FROM visualizacao JOIN postagem ON fkPostagem = idPostagem WHERE fkPostagem = p.idPostagem) as qtdVisualizacoes
    FROM postagem p
            JOIN usuario u
            ON p.fkUsuario = u.idUsuario
            WHERE idPostagem = ${idPostagem}
            ORDER BY p.dataHora;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

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
    WHERE p.idPostagem = ${idPostagem};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function publicar(titulo, descricao, idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", titulo, descricao, idUsuario);
    var instrucaoSql = `
        INSERT INTO postagem (assunto, descricao, dataHora, fkUsuario) VALUES ('${titulo}', '${descricao}', now(), ${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editar(novoAssunto, novaDescricao, idPostagem) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", novoAssunto, novaDescricao, idPostagem);
    var instrucaoSql = `
        UPDATE postagem SET assunto = '${novoAssunto}', descricao = '${novaDescricao}' WHERE idPostagem = ${idPostagem};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(idPostagem) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idPostagem);
    var instrucaoSql = `
        DELETE FROM postagem WHERE idPostagem = ${idPostagem};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    listarPorUsuario,
    pesquisarDescricao,
    publicar,
    editar,
    deletar,
    listarDadosPostagem,
    buscarComentarioPorPostagem,
    listarEstatisticas
}
