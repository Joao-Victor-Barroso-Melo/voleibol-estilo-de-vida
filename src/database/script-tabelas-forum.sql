DROP DATABASE IF EXISTS voleiForum;
CREATE DATABASE IF NOT EXISTS voleiForum;


USE voleiForum;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45),
	email VARCHAR(45),
	senha VARCHAR(45),
    fotoPerfil MEDIUMBLOB
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
    
UPDATE curtida SET isCurtido = true, dataHora = now() WHERE fkPostagem = 1 AND fkUsuario = 1;

INSERT INTO visualizacao (fkPostagem, fkUsuario, dataHora) VALUES 
	(1, 1 , now()),
	(1, 1 , now()),
	(2, 1 , now()),
	(2, 1 , now());
    
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
			(SELECT count(idComentario) FROM comentario JOIN postagem ON fkPostagem = idPostagem WHERE fkPostagem = p.idPostagem) as qtdComentarios,
			(SELECT count(isCurtido) FROM curtida JOIN postagem ON fkPostagem = idPostagem WHERE fkPostagem = p.idPostagem) as qtdCurtidas,
            (SELECT count(idVisualizacao) FROM visualizacao JOIN postagem ON fkPostagem = idPostagem WHERE fkPostagem = p.idPostagem) as qtdVisualizacoes
        FROM postagem p
                JOIN usuario u
                ON p.fkUsuario = u.idUsuario ORDER BY p.dataHora;
                
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
			(SELECT sum(isCurtido) FROM curtida JOIN postagem ON fkPostagem = idPostagem WHERE fkPostagem = p.idPostagem) as qtdCurtidas,
            (SELECT count(idVisualizacao) FROM visualizacao JOIN postagem ON fkPostagem = idPostagem WHERE fkPostagem = p.idPostagem) as qtdVisualizacoes
        FROM postagem p
                JOIN usuario u
                ON p.fkUsuario = u.idUsuario
                WHERE idPostagem = 1
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
    WHERE p.idPostagem = 1;
    
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
                