CREATE DATABASE voleiForum;

USE voleiForum;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
    fotoPerfil MEDIUMBLOB
);

CREATE TABLE postagem(
	idPostagem INT PRIMARY KEY AUTO_INCREMENT,
    assunto VARCHAR(45),
    descricao VARCHAR(255),
    dataHora DATETIME,
    fkUsuario INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE comentario(
	idComentario INT,
    fkPostagem INT,
    fkUsuario INT,
    mensagem VARCHAR(255),
    dataHora DATETIME,
    FOREIGN KEY (fkPostagem) REFERENCES postagem(idPostagem),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    PRIMARY KEY (idComentario, fkPostagem, fkUsuario)
); 

CREATE TABLE curtida(
	idCurtida INT,
    fkPostagem INT,
    fkUsuario INT,
    FOREIGN KEY (fkPostagem) REFERENCES postagem(idPostagem),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    PRIMARY KEY (idCurtida, fkPostagem, fkUsuario)
); 

CREATE TABLE visualizacao(
	idVisualizacao INT,
    fkPostagem INT,
    fkUsuario INT,
    dataHora DATETIME,
    FOREIGN KEY (fkPostagem) REFERENCES postagem(idPostagem),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    PRIMARY KEY (idVisualizacao, fkPostagem, fkUsuario)
); 

INSERT INTO usuario (nome, email, senha) VALUES ('João Victor', 'joao@gmail.com', 'joao@gmail.com1');

SELECT * FROM usuario;