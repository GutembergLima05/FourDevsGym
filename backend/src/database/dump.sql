CREATE TABLE academia 
( 
    id_academia INT AUTO_INCREMENT PRIMARY KEY, 
    nome VARCHAR(255) NOT NULL,  
    endereco VARCHAR(255) NOT NULL,
    data_criacao DATE DEFAULT CURRENT_DATE,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
); 

CREATE TABLE administrador 
( 
    id_adm INT AUTO_INCREMENT PRIMARY KEY, 
    email VARCHAR(255) NOT NULL UNIQUE,  
    nome VARCHAR(255) NOT NULL,  
    senha VARCHAR(255) NOT NULL,  
    cargo VARCHAR(50) NOT NULL,  
    id_academia INT,
    data_criacao DATE DEFAULT CURRENT_DATE,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_academia) REFERENCES academia(id_academia) ON DELETE SET NULL
);

CREATE TABLE plano 
( 
    id_plano INT AUTO_INCREMENT PRIMARY KEY, 
    tipo VARCHAR(255) NOT NULL,  
    valor FLOAT NOT NULL,  
    id_academia INT,
    dias_validade INT NOT NULL,
    data_criacao DATE DEFAULT CURRENT_DATE,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_academia) REFERENCES academia(id_academia) ON DELETE SET NULL
);

CREATE TABLE treino 
( 
    id_treino INT AUTO_INCREMENT PRIMARY KEY, 
    nome VARCHAR(255) NOT NULL,  
    descricao VARCHAR(255),  
    id_administrador INT,
    data_criacao DATE DEFAULT CURRENT_DATE,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_administrador) REFERENCES administrador(id_adm) ON DELETE SET NULL
);

CREATE TABLE exercicio 
( 
    id_exercicio INT AUTO_INCREMENT PRIMARY KEY, 
    nome VARCHAR(255) NOT NULL,  
    descricao VARCHAR(255),  
    id_administrador INT,
    gif_url VARCHAR(255),
    data_criacao DATE DEFAULT CURRENT_DATE,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_administrador) REFERENCES administrador(id_adm) ON DELETE SET NULL
);

CREATE TABLE aluno 
( 
    id_aluno INT AUTO_INCREMENT PRIMARY KEY, 
    nome VARCHAR(255) NOT NULL,  
    email VARCHAR(255) NOT NULL UNIQUE,  
    nascimento DATE NOT NULL,  
    telefone VARCHAR(20) NOT NULL,  
    endereco VARCHAR(255),  
    historico VARCHAR(255),
    data_inicio_plano DATE,
    plano_ativo BOOLEAN DEFAULT FALSE,  
    id_academia INT,  
    id_treino INT,  
    id_plano INT,
    data_criacao DATE DEFAULT CURRENT_DATE,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_academia) REFERENCES academia(id_academia) ON DELETE SET NULL,
    FOREIGN KEY (id_treino) REFERENCES treino(id_treino) ON DELETE SET NULL,
    FOREIGN KEY (id_plano) REFERENCES plano(id_plano) ON DELETE SET NULL
    id_Academia INT NOT NULL,  
    id_Treino INT NOT NULL,  
    id_Academia INT,  
    id_Treino INT,  
    id_Plano INT,
    data_Criacao DATE DEFAULT CURRENT_DATE,
    data_Atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE dia (
    id_dia INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(10) NOT NULL
);

CREATE TABLE venda 
( 
    id_venda INT AUTO_INCREMENT PRIMARY KEY, 
    nome VARCHAR(255) NOT NULL,  
    metodo_pagamento VARCHAR(50) NOT NULL,  
    data_venda DATE NOT NULL,
    data_criacao DATE DEFAULT CURRENT_DATE,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
);

CREATE TABLE produto 
( 
    id_produto INT AUTO_INCREMENT PRIMARY KEY, 
    nome VARCHAR(255) NOT NULL,  
    valor FLOAT NOT NULL,  
    descricao VARCHAR(255),  
    quantidade INT NOT NULL,  
    id_academia INT,
    data_criacao DATE DEFAULT CURRENT_DATE,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_academia) REFERENCES academia(id_academia) ON DELETE SET NULL
);

CREATE TABLE aviso 
( 
    id_aviso INT AUTO_INCREMENT PRIMARY KEY, 
    titulo VARCHAR(255) NOT NULL,  
    descricao VARCHAR(255),  
    id_academia INT,
    gif_url VARCHAR(255),
    data_criacao DATE DEFAULT CURRENT_DATE,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    data_expiracao TIMESTAMP,
    FOREIGN KEY (id_academia) REFERENCES academia(id_academia) ON DELETE SET NULL
);

CREATE TABLE avaliacao 
( 
    id_avaliacao INT AUTO_INCREMENT PRIMARY KEY, 
    braco_direito_contraido FLOAT,  
    braco_direito_relaxado FLOAT,  
    braco_esquerdo_contraido FLOAT,  
    braco_esquerdo_relaxado FLOAT,  
    agua_corporal FLOAT,  
    torax FLOAT,  
    altura FLOAT,  
    peso FLOAT,  
    gordura_visceral FLOAT,  
    massa_ossea FLOAT,  
    cintura FLOAT,  
    abdomen FLOAT,  
    quadril FLOAT,  
    coxa_esquerda FLOAT,  
    coxa_direita FLOAT,  
    antebraco_direito FLOAT,  
    panturrilha_esquerda FLOAT,  
    panturrilha_direita FLOAT,  
    antebraco_esquerdo FLOAT,  
    id_administrador INT,  
    id_aluno INT,
    data_criacao DATE DEFAULT CURRENT_DATE,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_administrador) REFERENCES administrador(id_adm) ON DELETE SET NULL,
    FOREIGN KEY (id_aluno) REFERENCES aluno(id_aluno) ON DELETE SET NULL
);

CREATE TABLE produto_venda 
( 
    id_venda INT,  
    id_produto INT,  
    quantidade INT,  
    valor FLOAT,  
    PRIMARY KEY (id_venda, id_produto),
    data_criacao DATE DEFAULT CURRENT_DATE,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_venda) REFERENCES venda(id_venda) ON DELETE CASCADE,
    FOREIGN KEY (id_produto) REFERENCES produto(id_produto) ON DELETE CASCADE
    id_Venda INT,  
    id_Produto INT,  
    Quantidade INT NOT NULL,  
    Valor FLOAT NOT NULL,  
    Quantidade INT,  
    Valor FLOAT,  
    PRIMARY KEY (id_Venda, id_Produto),
    data_Criacao DATE DEFAULT CURRENT_DATE,
    data_Atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE treino_dia_exercicio (
    id_treino INT NOT NULL,
    id_dia INT NOT NULL,
    id_exercicio INT NOT NULL,
    repeticoes INT NULL,
    series INT NULL
    id_treino INT,
    id_dia INT,
    id_exercicio INT,
    repeticoes INT,
    series INT,
    FOREIGN KEY (id_dia) REFERENCES dia(id_dia) ON DELETE CASCADE,
    FOREIGN KEY (id_exercicio) REFERENCES exercicio(id_exercicio) ON DELETE CASCADE,
    FOREIGN KEY (id_treino) REFERENCES treino(id_treino) ON DELETE CASCADE
    series INT
);


INSERT INTO dia(nome) values ('Dia 1'), ('Dia 2'), ('Dia 3'), ('Dia 4'), ('Dia 5'),('Dia 6'),('Dia 7')

-- Função para verificar expiração de avisos
CREATE PROCEDURE verificar_expiracao_aviso()
BEGIN
    -- Excluir avisos com data de expiração menor ou igual ao timestamp atual
    DELETE FROM aviso WHERE data_expiracao <= CURRENT_TIMESTAMP();
END;

-- Trigger para atualizar timestamp na tabela Aluno
CREATE TRIGGER update_aluno_timestamp_trigger
BEFORE UPDATE ON aluno
FOR EACH ROW
BEGIN
    SET NEW.data_atualizacao = CURRENT_TIMESTAMP();
END;

-- Trigger para atualizar timestamp na tabela Administrador
CREATE TRIGGER update_administrador_timestamp_trigger
BEFORE UPDATE ON administrador
FOR EACH ROW
BEGIN
    SET NEW.data_atualizacao = CURRENT_TIMESTAMP();
END;

-- Trigger para atualizar timestamp na tabela Exercicio
CREATE TRIGGER update_exercicio_timestamp_trigger
BEFORE UPDATE ON exercicio
FOR EACH ROW
BEGIN
    SET NEW.data_atualizacao = CURRENT_TIMESTAMP();
END;

-- Trigger para atualizar timestamp na tabela Treino
CREATE TRIGGER update_treino_timestamp_trigger
BEFORE UPDATE ON treino
FOR EACH ROW
BEGIN
    SET NEW.data_atualizacao = CURRENT_TIMESTAMP();
END;

-- Trigger para atualizar timestamp na tabela Venda
CREATE TRIGGER update_venda_timestamp_trigger
BEFORE UPDATE ON venda
FOR EACH ROW
BEGIN
    SET NEW.data_atualizacao = CURRENT_TIMESTAMP();
END;

-- Trigger para atualizar timestamp na tabela Produto
CREATE TRIGGER update_produto_timestamp_trigger
BEFORE UPDATE ON produto
FOR EACH ROW
BEGIN
    SET NEW.data_atualizacao = CURRENT_TIMESTAMP();
END;

-- Trigger para atualizar timestamp na tabela Aviso
CREATE TRIGGER update_aviso_timestamp_trigger
BEFORE UPDATE ON aviso
FOR EACH ROW
BEGIN
    SET NEW.data_atualizacao = CURRENT_TIMESTAMP();
END;

-- Trigger para atualizar timestamp na tabela Academia
CREATE TRIGGER update_academia_timestamp_trigger
BEFORE UPDATE ON academia
FOR EACH ROW
BEGIN
    SET NEW.data_atualizacao = CURRENT_TIMESTAMP();
END;

-- Trigger para atualizar timestamp na tabela Plano
CREATE TRIGGER update_plano_timestamp_trigger
BEFORE UPDATE ON plano
FOR EACH ROW
BEGIN
    SET NEW.data_atualizacao = CURRENT_TIMESTAMP();
END;

-- Trigger para atualizar timestamp na tabela Avaliacao
CREATE TRIGGER update_avaliacao_timestamp_trigger
BEFORE UPDATE ON avaliacao
FOR EACH ROW
BEGIN
    SET NEW.data_atualizacao = CURRENT_TIMESTAMP();
END;
