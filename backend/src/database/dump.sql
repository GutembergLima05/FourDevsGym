CREATE TABLE Aluno 
( 
    id_Aluno SERIAL PRIMARY KEY, 
    nome VARCHAR(255) NOT NULL,  
    email VARCHAR(255) NOT NULL UNIQUE,  
    nascimento DATE NOT NULL,  
    telefone VARCHAR(20) NOT NULL,  
    endereco VARCHAR(255),  
    historico VARCHAR(255),  
    id_Academia INT,  
    id_Treino INT,  
    id_Plano INT,
    data_Criacao DATE DEFAULT CURRENT_DATE,
    data_Atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE Administrador 
( 
    id_Adm SERIAL PRIMARY KEY, 
    email VARCHAR(255) NOT NULL UNIQUE,  
    nome VARCHAR(255) NOT NULL,  
    senha VARCHAR(255) NOT NULL,  
    cargo VARCHAR(50) NOT NULL,  
    id_Academia INT,
    data_Criacao DATE DEFAULT CURRENT_DATE,
    data_Atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE Exercicio 
( 
    id_Exercicio SERIAL PRIMARY KEY, 
    nome VARCHAR(255) NOT NULL,  
    descricao VARCHAR(255),  
    id_Administrador INT,
    data_Criacao DATE DEFAULT CURRENT_DATE,
    data_Atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE Treino 
( 
    id_Treino SERIAL PRIMARY KEY, 
    nome VARCHAR(255) NOT NULL,  
    descricao VARCHAR(255),  
    id_Administrador INT,
    data_Criacao DATE DEFAULT CURRENT_DATE,
    data_Atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE Venda 
( 
    id_Venda SERIAL PRIMARY KEY, 
    nome VARCHAR(255) NOT NULL,  
    metodo_Pagamento VARCHAR(50) NOT NULL,  
    data_Venda DATE NOT NULL,
    data_Criacao DATE DEFAULT CURRENT_DATE,
    data_Atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE Produto 
( 
    id_Produto SERIAL PRIMARY KEY, 
    nome VARCHAR(255) NOT NULL,  
    valor FLOAT NOT NULL,  
    descricao VARCHAR(255),  
    quantidade INT NOT NULL,  
    id_Academia INT,
    data_Criacao DATE DEFAULT CURRENT_DATE,
    data_Atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE Aviso 
( 
    id_Aviso SERIAL PRIMARY KEY, 
    titulo VARCHAR(255) NOT NULL,  
    descricao VARCHAR(255),  
    id_Academia INT,
    data_Criacao DATE DEFAULT CURRENT_DATE,
    data_Atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE Academia 
( 
    id_Academia SERIAL PRIMARY KEY, 
    nome VARCHAR(255) NOT NULL,  
    endereco VARCHAR(255) NOT NULL,
    data_Criacao DATE DEFAULT CURRENT_DATE,
    data_Atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
); 

CREATE TABLE Plano 
( 
    id_Plano SERIAL PRIMARY KEY, 
    tipo VARCHAR(255) NOT NULL,  
    valor FLOAT NOT NULL,  
    id_Academia INT,
    data_Criacao DATE DEFAULT CURRENT_DATE,
    data_Atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE Avaliacao 
( 
    id_Avaliacao SERIAL PRIMARY KEY, 
    braco_Direito_Contraido FLOAT,  
    braco_Direito_Relaxado FLOAT,  
    braco_Esquerdo_Contraido FLOAT,  
    braco_Esquerdo_Relaxado FLOAT,  
    agua_Corporal FLOAT,  
    Torax FLOAT,  
    Altura FLOAT,  
    Peso FLOAT,  
    gordura_Visceral FLOAT,  
    massa_Ossea FLOAT,  
    cintura FLOAT,  
    abdomen FLOAT,  
    quadril FLOAT,  
    coxa_Esquerda FLOAT,  
    coxa_Direita FLOAT,  
    antebraco_Direito FLOAT,  
    panturrilha_Esquerda FLOAT,  
    panturrilha_Direita FLOAT,  
    antebraco_Esquerdo FLOAT,  
    id_Administrador INT,  
    id_Aluno INT,
    data_Criacao DATE DEFAULT CURRENT_DATE,
    data_Atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE Produto_Venda 
( 
    id_Venda INT,  
    id_Produto INT,  
    Quantidade INT NOT NULL,  
    Valor FLOAT NOT NULL,  
    PRIMARY KEY (id_Venda, id_Produto),
    data_Criacao DATE DEFAULT CURRENT_DATE,
    data_Atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE Exercicio_Treino 
( 
    id_Treino INT,  
    id_Exercicio INT,  
    PRIMARY KEY (id_Treino, id_Exercicio),
    data_Criacao DATE DEFAULT CURRENT_DATE,
    data_Atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

ALTER TABLE Aluno ADD FOREIGN KEY (id_Academia) REFERENCES Academia (id_Academia);
ALTER TABLE Aluno ADD FOREIGN KEY (id_Treino) REFERENCES Treino (id_Treino);
ALTER TABLE Aluno ADD FOREIGN KEY (id_Plano) REFERENCES Plano (id_Plano);

ALTER TABLE Administrador ADD FOREIGN KEY (id_Academia) REFERENCES Academia (id_Academia);

ALTER TABLE Exercicio ADD FOREIGN KEY (id_Administrador) REFERENCES Administrador (id_Adm);

ALTER TABLE Treino ADD FOREIGN KEY (id_Administrador) REFERENCES Administrador (id_Adm);

ALTER TABLE Produto ADD FOREIGN KEY (id_Academia) REFERENCES Academia (id_Academia);

ALTER TABLE Aviso ADD FOREIGN KEY (id_Academia) REFERENCES Academia (id_Academia);

ALTER TABLE Plano ADD FOREIGN KEY (id_Academia) REFERENCES Academia (id_Academia);

ALTER TABLE Avaliacao ADD FOREIGN KEY (id_Administrador) REFERENCES Administrador (id_Adm);
ALTER TABLE Avaliacao ADD FOREIGN KEY (id_Aluno) REFERENCES Aluno (id_Aluno);

ALTER TABLE Produto_Venda ADD FOREIGN KEY (id_Venda) REFERENCES Venda (id_Venda);
ALTER TABLE Produto_Venda ADD FOREIGN KEY (id_Produto) REFERENCES Produto (id_Produto);

ALTER TABLE Exercicio_Treino ADD FOREIGN KEY (id_Treino) REFERENCES Treino (id_Treino);
ALTER TABLE Exercicio_Treino ADD FOREIGN KEY (id_Exercicio) REFERENCES Exercicio (id_Exercicio);

ALTER TABLE Aviso ADD COLUMN data_expiracao TIMESTAMP;

CREATE OR REPLACE FUNCTION verificar_expiracao_aviso()
RETURNS void AS $$
BEGIN
    -- Excluir avisos com data de expiração menor ou igual ao timestamp atual
    DELETE FROM aviso WHERE data_expiracao <= clock_timestamp();
END;
$$ LANGUAGE plpgsql;

-- Tabela Aluno
CREATE OR REPLACE FUNCTION update_aluno_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.data_atualizacao = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_aluno_timestamp_trigger
BEFORE UPDATE ON Aluno
FOR EACH ROW
EXECUTE FUNCTION update_aluno_timestamp();


-- Tabela Administrador
CREATE OR REPLACE FUNCTION update_administrador_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.data_atualizacao = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_administrador_timestamp_trigger
BEFORE UPDATE ON Administrador
FOR EACH ROW
EXECUTE FUNCTION update_administrador_timestamp();


-- Tabela Exercicio
CREATE OR REPLACE FUNCTION update_exercicio_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.data_atualizacao = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_exercicio_timestamp_trigger
BEFORE UPDATE ON Exercicio
FOR EACH ROW
EXECUTE FUNCTION update_exercicio_timestamp();


-- Tabela Treino
CREATE OR REPLACE FUNCTION update_treino_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.data_atualizacao = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_treino_timestamp_trigger
BEFORE UPDATE ON Treino
FOR EACH ROW
EXECUTE FUNCTION update_treino_timestamp();


-- Tabela Venda
CREATE OR REPLACE FUNCTION update_venda_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.data_atualizacao = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_venda_timestamp_trigger
BEFORE UPDATE ON Venda
FOR EACH ROW
EXECUTE FUNCTION update_venda_timestamp();


-- Tabela Produto
CREATE OR REPLACE FUNCTION update_produto_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.data_atualizacao = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_produto_timestamp_trigger
BEFORE UPDATE ON Produto
FOR EACH ROW
EXECUTE FUNCTION update_produto_timestamp();


-- Tabela Aviso
CREATE OR REPLACE FUNCTION update_aviso_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.data_atualizacao = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_aviso_timestamp_trigger
BEFORE UPDATE ON Aviso
FOR EACH ROW
EXECUTE FUNCTION update_aviso_timestamp();


-- Tabela Academia
CREATE OR REPLACE FUNCTION update_academia_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.data_atualizacao = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_academia_timestamp_trigger
BEFORE UPDATE ON Academia
FOR EACH ROW
EXECUTE FUNCTION update_academia_timestamp();


-- Tabela Plano
CREATE OR REPLACE FUNCTION update_plano_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.data_atualizacao = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_plano_timestamp_trigger
BEFORE UPDATE ON Plano
FOR EACH ROW
EXECUTE FUNCTION update_plano_timestamp();


-- Tabela Avaliacao
CREATE OR REPLACE FUNCTION update_avaliacao_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.data_atualizacao = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_avaliacao_timestamp_trigger
BEFORE UPDATE ON Avaliacao
FOR EACH ROW
EXECUTE FUNCTION update_avaliacao_timestamp();


-- Tabela Produto_Venda
CREATE OR REPLACE FUNCTION update_produto_venda_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.data_atualizacao = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_produto_venda_timestamp_trigger
BEFORE UPDATE ON Produto_Venda
FOR EACH ROW
EXECUTE FUNCTION update_produto_venda_timestamp();


-- Tabela Exercicio_Treino
CREATE OR REPLACE FUNCTION update_exercicio_treino_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.data_atualizacao = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_exercicio_treino_timestamp_trigger
BEFORE UPDATE ON Exercicio_Treino
FOR EACH ROW
EXECUTE FUNCTION update_exercicio_treino_timestamp();

--SELECT verificar_expiracao_aviso();