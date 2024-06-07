DROP DATABASE IF EXISTS voleiForum;
CREATE DATABASE IF NOT EXISTS voleiForum;


USE voleiForum;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45),
	email VARCHAR(45),
	senha VARCHAR(45),
    fotoPerfil VARCHAR(255)
);

CREATE TABLE postagem(
	idPostagem INT PRIMARY KEY AUTO_INCREMENT,
    assunto VARCHAR(255),
    descricao VARCHAR(255),
    dataHora DATETIME,
    fkUsuario INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE comentario(
	idComentario INT AUTO_INCREMENT,
    fkPostagem INT,
    fkUsuario INT,
    mensagem VARCHAR(255),
    dataHora DATETIME,
    FOREIGN KEY (fkPostagem) REFERENCES postagem(idPostagem),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    PRIMARY KEY (idComentario, fkPostagem, fkUsuario)
); 

CREATE TABLE curtida(
	idCurtida INT AUTO_INCREMENT,
    fkPostagem INT,
    fkUsuario INT,
    isCurtido BOOLEAN,
    dataHora DATETIME,
    FOREIGN KEY (fkPostagem) REFERENCES postagem(idPostagem),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    PRIMARY KEY (idCurtida, fkPostagem, fkUsuario)
); 

CREATE TABLE visualizacao(
	idVisualizacao INT AUTO_INCREMENT,
    fkPostagem INT,
    fkUsuario INT,
    dataHora DATETIME,
    FOREIGN KEY (fkPostagem) REFERENCES postagem(idPostagem),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    PRIMARY KEY (idVisualizacao, fkPostagem, fkUsuario)
); 

-- SIMULACAO DE POSTAGEM EM DIAS ANTERIORES
INSERT INTO postagem (assunto, descricao, dataHora, fkUsuario) VALUES 
	('outro', 'outro dia', '2024-05-10 10:00:00', 1),
	('outro', 'dia', '2024-05-10 11:00:00', 1);

INSERT INTO usuario (nome, email, senha) VALUES ('João Victor', 'joao@gmail.com', 'joao@gmail.com1');

INSERT INTO postagem (assunto, descricao, dataHora, fkUsuario) VALUES 
	('Como vocês melhoram a impulsão nos treinos?', 'Eu tenho feito diversos circuitos para aumentar minha impulsão.', now(), 1),
	('teste', 'este', now(), 1);

INSERT INTO comentario (fkPostagem, fkUsuario, mensagem, dataHora) VALUES
	(1, 1, 'Acho que você deveria treinar impulsão separado do seu treino de perna.', now()),
	(1, 1, 'Ou você poderia comer melhor para saúde e bem estar', now()),
	(2, 1, 'Ou você poderia comer melhor para saúde e bem estar', now());
    
INSERT INTO curtida (fkPostagem, fkUsuario, isCurtido, dataHora) VALUES 
	(1, 1, true, now()),
	(2, 1, false, now());
    

INSERT INTO visualizacao (fkPostagem, fkUsuario, dataHora) VALUES 
	(1, 1 , now()),
	(1, 1 , now()),
	(2, 1 , now()),
	(2, 1 , now());
    
UPDATE curtida SET isCurtido = true, dataHora = now() WHERE fkPostagem = 1 AND fkUsuario = 1;
SELECT * FROM curtida WHERE fkPostagem = 1 AND fkUsuario = 3;

SELECT * FROM usuario;
SELECT * FROM postagem;
SELECT * FROM comentario;
SELECT * FROM curtida;
SELECT * FROM visualizacao;

SELECT 
            p.idPostagem,
            p.assunto,
            p.fkUsuario,
            p.dataHora,
            u.idUsuario,
            u.nome,
            u.fotoPerfil,
			(SELECT count(idComentario) FROM comentario JOIN postagem ON fkPostagem = idPostagem WHERE fkPostagem = p.idPostagem) as qtdComentarios,
			(SELECT count(isCurtido) FROM curtida JOIN postagem ON fkPostagem = idPostagem WHERE fkPostagem = p.idPostagem) as qtdCurtidas,
            (SELECT count(idVisualizacao) FROM visualizacao JOIN postagem ON fkPostagem = idPostagem WHERE fkPostagem = p.idPostagem) as qtdVisualizacoes
        FROM postagem p
                JOIN usuario u
                ON p.fkUsuario = u.idUsuario WHERE p.assunto LIKE '%%' ORDER BY p.dataHora DESC LIMIT 3 OFFSET 3;
                
SELECT * FROM usuario WHERE idUsuario = 1;

SELECT 
            p.idPostagem,
            p.assunto,
            p.descricao,
            p.fkUsuario,
            p.dataHora,
            u.nome
        FROM postagem p
            INNER JOIN usuario u
                ON p.fkUsuario = u.idUsuario
                WHERE p.fkUsuario = 1
                ORDER BY p.dataHora DESC
                ;

-- PEGAR TODOS OS DADOS DE UMA POSTAGEM
SELECT 
            p.idPostagem,
            p.assunto,
            p.descricao,
            p.fkUsuario,
            p.dataHora,
            u.idUsuario,
            u.nome,
			(SELECT count(idComentario) FROM comentario JOIN postagem ON fkPostagem = idPostagem WHERE fkPostagem = p.idPostagem) as qtdComentarios,
			(SELECT COALESCE(sum(isCurtido), 0) FROM curtida JOIN postagem ON fkPostagem = idPostagem WHERE fkPostagem = p.idPostagem) as qtdCurtidas,
            (SELECT count(idVisualizacao) FROM visualizacao JOIN postagem ON fkPostagem = idPostagem WHERE fkPostagem = p.idPostagem) as qtdVisualizacoes
        FROM postagem p
                JOIN usuario u
                ON p.fkUsuario = u.idUsuario
                WHERE idPostagem = 7
                ORDER BY p.dataHora;
   
-- PEGAR COMENTARIOS DE UMA POSTAGEM ESPECIFICA
SELECT 
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
    WHERE p.idPostagem = 7;
    
-- PEGAR POSTAGEM UNICA
SELECT 
            p.idPostagem,
            p.assunto,
            p.descricao,
            p.fkUsuario,
            p.dataHora,
            u.nome
        FROM postagem p
            INNER JOIN usuario u
                ON p.fkUsuario = u.idUsuario
                WHERE p.fkUsuario = 1 AND p.idPostagem = 1;

SELECT 
            p.idPostagem,
            p.assunto,
            p.fkUsuario,
            p.dataHora,
            u.idUsuario,
            u.nome,
			(SELECT count(idComentario) FROM comentario JOIN postagem ON fkPostagem = idPostagem WHERE fkPostagem = p.idPostagem) as qtdComentarios,
			(SELECT COALESCE(sum(isCurtido), 0) FROM curtida JOIN postagem ON fkPostagem = idPostagem WHERE fkPostagem = p.idPostagem) as qtdCurtidas,
            (SELECT count(idVisualizacao) FROM visualizacao JOIN postagem ON fkPostagem = idPostagem WHERE fkPostagem = p.idPostagem) as qtdVisualizacoes
            FROM postagem p
                JOIN usuario u
                ON p.fkUsuario = u.idUsuario ORDER BY p.dataHora DESC;
                
                
-- LISTAR POR USUÁRIO
SELECT 
        p.idPostagem,
        p.assunto,
        p.descricao,
        p.fkUsuario,
        p.dataHora,
        u.nome
    FROM postagem p
        INNER JOIN usuario u
            ON p.fkUsuario = u.idUsuario
            WHERE p.fkUsuario = 2
            GROUP BY p.dataHora ORDER BY p.dataHora DESC
            ;
            
            
	
-- SELECT DE TESTE PARA PEGAR TOTAL DE INTERAÇÕES DO DIA

SELECT 
    DATE(p.dataHora) as data,
    COUNT(DISTINCT p.idPostagem) as totalPostagens,
    COUNT(DISTINCT c.idComentario) as totalComentarios,
    COUNT(DISTINCT cu.idCurtida) as totalCurtidas,
    COUNT(DISTINCT v.idVisualizacao) as totalVisualizacoes
FROM 
    postagem p
LEFT JOIN 
    comentario c ON p.idPostagem = c.fkPostagem AND DATE(p.dataHora) = DATE(c.dataHora)
LEFT JOIN 
    curtida cu ON p.idPostagem = cu.fkPostagem AND DATE(p.dataHora) = DATE(cu.dataHora)
LEFT JOIN 
    visualizacao v ON p.idPostagem = v.fkPostagem AND DATE(p.dataHora) = DATE(v.dataHora)
WHERE 
    p.fkUsuario = 1
GROUP BY 
    DATE(p.dataHora)
ORDER BY 
    DATE(p.dataHora) DESC;
    
    
SELECT 
	 DATE_FORMAT(p.dataHora, '%d/%m/%y') AS data_formatada,
	 COUNT(idComentario) as qtdComentario
    FROM postagem p 
    JOIN comentario c
    ON c.fkPostagem = p.idPostagem
    GROUP BY data_formatada;
    
-- FAZ SELECT NORMAL EM COMENTARIO E VISUALIZAÇÕES PASSANDO O DIA AAAAAAAA
SELECT 
	DATE_FORMAT(p.dataHora, '%d/%m/%y') AS data_formatada,
	COUNT(DISTINCT idComentario)
    FROM postagem p 
    LEFT JOIN comentario c 
    ON c.fkPostagem = p.idPostagem
    JOIN usuario u
    ON p.fkUsuario = u.idUsuario
    WHERE u.idUsuario = 1
    GROUP BY data_formatada;
    
    
-- total de comentarios e visualizacoes agrupados por dia
SELECT 
    DATE_FORMAT(p.dataHora, '%d/%m/%y') AS data_formatada,
    COUNT(DISTINCT c.idComentario) AS total_comentarios,
    COUNT(DISTINCT v.idVisualizacao) AS total_visualizacoes
	FROM postagem p
	LEFT JOIN comentario c 
    ON c.fkPostagem = p.idPostagem
	LEFT JOIN visualizacao v 
    ON v.fkPostagem = p.idPostagem
	JOIN usuario u ON p.fkUsuario = u.idUsuario
	WHERE u.idUsuario = 1
	GROUP BY data_formatada;
    
SELECT 
    DATE_FORMAT(p.dataHora, '%d/%m/%y') AS data_formatada,
    COALESCE(SUM(isCurtido), 0) as total_curtida
	FROM postagem p
	LEFT JOIN curtida cu
    ON cu.fkPostagem = p.idPostagem
	JOIN usuario u ON p.fkUsuario = u.idUsuario
	WHERE u.idUsuario = 1
	GROUP BY data_formatada;
    
    
-- JUNTA OS DOIS SELECTS
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
    WHERE u.idUsuario = 1
    GROUP BY data_formatada
) a
LEFT JOIN (
    SELECT 
        DATE_FORMAT(p.dataHora, '%d/%m/%y') AS data_formatada,
        COALESCE(SUM(isCurtido), 0) AS total_curtida
    FROM postagem p
    LEFT JOIN curtida cu ON cu.fkPostagem = p.idPostagem
    JOIN usuario u ON p.fkUsuario = u.idUsuario
    WHERE u.idUsuario = 1
    GROUP BY data_formatada
) b ON a.data_formatada = b.data_formatada;






