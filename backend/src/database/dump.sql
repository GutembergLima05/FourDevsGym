CREATE TABLE Aluno 
( 
    idAluno SERIAL PRIMARY KEY, 
    nomeAluno VARCHAR(255) NOT NULL,  
    emailAluno VARCHAR(255) NOT NULL UNIQUE,  
    nascimentoAluno DATE NOT NULL,  
    telefoneAluno VARCHAR(20) NOT NULL,  
    enderecoAluno VARCHAR(255),  
    historicoAluno VARCHAR(255),  
    idAcademia INT,  
    idTreino INT,  
    idPlano INT 
);

CREATE TABLE Administrador 
( 
    idAdm SERIAL PRIMARY KEY, 
    email VARCHAR(255) NOT NULL UNIQUE,  
    nome VARCHAR(255) NOT NULL,  
    senha VARCHAR(255) NOT NULL,  
    cargo VARCHAR(50) NOT NULL,  
    idAcademia INT 
);

CREATE TABLE Exercicio 
( 
    idExercicio SERIAL PRIMARY KEY, 
    nomeExercicio VARCHAR(255) NOT NULL,  
    descricaoExercicio VARCHAR(255),  
    idAdministrador INT 
);

CREATE TABLE Treino 
( 
    idTreino SERIAL PRIMARY KEY, 
    nomeTreino VARCHAR(255) NOT NULL,  
    descricaoTreino VARCHAR(255),  
    idAdministrador INT 
);

CREATE TABLE Venda 
( 
    idVenda SERIAL PRIMARY KEY, 
    nomeCliente VARCHAR(255) NOT NULL,  
    metodoPagamento VARCHAR(50) NOT NULL,  
    dataVenda DATE NOT NULL
);

CREATE TABLE Produto 
( 
    idProduto SERIAL PRIMARY KEY, 
    nomeProduto VARCHAR(255) NOT NULL,  
    valorProduto FLOAT NOT NULL,  
    descricaoProduto VARCHAR(255),  
    quantidadeProduto INT NOT NULL,  
    idAcademia INT 
);

CREATE TABLE Aviso 
( 
    idAviso SERIAL PRIMARY KEY, 
    tituloAviso VARCHAR(255) NOT NULL,  
    descricaoAviso VARCHAR(255),  
    idAcademia INT 
);

CREATE TABLE Academia 
( 
    idAcademia SERIAL PRIMARY KEY, 
    nomeAcademia VARCHAR(255) NOT NULL,  
    enderecoAcademia VARCHAR(255) NOT NULL
);

CREATE TABLE Plano 
( 
    idPlano SERIAL PRIMARY KEY, 
    tipoPlano VARCHAR(255) NOT NULL,  
    valorPlano FLOAT NOT NULL,  
    idAcademia INT 
);

CREATE TABLE Avaliacao 
( 
    idAvaliacao SERIAL PRIMARY KEY, 
    braco_direito_contraido FLOAT,  
    braco_direito_relaxado FLOAT,  
    braco_esquerdo_contraido FLOAT,  
    braco_esquerdo_relaxado FLOAT,  
    aguaCorporal FLOAT,  
    Torax FLOAT,  
    Altura FLOAT,  
    Peso FLOAT,  
    gorduraVisceral FLOAT,  
    massaOssea FLOAT,  
    cintura FLOAT,  
    abdomen FLOAT,  
    quadril FLOAT,  
    coxa_esquerda FLOAT,  
    coxa_direita FLOAT,  
    antebraco_direito FLOAT,  
    panturrilha_esquerda FLOAT,  
    panturrilha_direita FLOAT,  
    antebraco_esquerdo FLOAT,  
    idAdministrador INT,  
    idAluno INT
);

CREATE TABLE Produto_Venda 
( 
    idVenda INT,  
    idProduto INT,  
    Quantidade INT NOT NULL,  
    Valor FLOAT NOT NULL,  
    PRIMARY KEY (idVenda, idProduto)
);

CREATE TABLE Exercicio_Treino 
( 
    idTreino INT,  
    idExercicio INT,  
    PRIMARY KEY (idTreino, idExercicio)
);

ALTER TABLE Aluno ADD FOREIGN KEY (idAcademia) REFERENCES Academia (idAcademia);
ALTER TABLE Aluno ADD FOREIGN KEY (idTreino) REFERENCES Treino (idTreino);
ALTER TABLE Aluno ADD FOREIGN KEY (idPlano) REFERENCES Plano (idPlano);

ALTER TABLE Administrador ADD FOREIGN KEY (idAcademia) REFERENCES Academia (idAcademia);

ALTER TABLE Exercicio ADD FOREIGN KEY (idAdministrador) REFERENCES Administrador (idAdm);

ALTER TABLE Treino ADD FOREIGN KEY (idAdministrador) REFERENCES Administrador (idAdm);

ALTER TABLE Produto ADD FOREIGN KEY (idAcademia) REFERENCES Academia (idAcademia);

ALTER TABLE Aviso ADD FOREIGN KEY (idAcademia) REFERENCES Academia (idAcademia);

ALTER TABLE Plano ADD FOREIGN KEY (idAcademia) REFERENCES Academia (idAcademia);

ALTER TABLE Avaliacao ADD FOREIGN KEY (idAdministrador) REFERENCES Administrador (idAdm);
ALTER TABLE Avaliacao ADD FOREIGN KEY (idAluno) REFERENCES Aluno (idAluno);

ALTER TABLE Produto_Venda ADD FOREIGN KEY (idVenda) REFERENCES Venda (idVenda);
ALTER TABLE Produto_Venda ADD FOREIGN KEY (idProduto) REFERENCES Produto (idProduto);

ALTER TABLE Exercicio_Treino ADD FOREIGN KEY (idTreino) REFERENCES Treino (idTreino);
ALTER TABLE Exercicio_Treino ADD FOREIGN KEY (idExercicio) REFERENCES Exercicio (idExercicio);
