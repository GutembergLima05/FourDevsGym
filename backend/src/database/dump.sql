CREATE TABLE academia 
( 
    id_academia SERIAL PRIMARY KEY, 
    id_academia SERIAL PRIMARY KEY, 
    nome VARCHAR(255) NOT NULL,  
    endereco VARCHAR(255) NOT NULL,
    data_criacao DATE DEFAULT CURRENT_DATE,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
); 

CREATE TABLE administrador 
( 
    id_adm SERIAL PRIMARY KEY, 
    id_adm SERIAL PRIMARY KEY, 
    email VARCHAR(255) NOT NULL UNIQUE,  
    nome VARCHAR(255) NOT NULL,  
    senha VARCHAR(255) NOT NULL,  
    cargo VARCHAR(50) NOT NULL,  
    id_academia INT,
    data_criacao DATE DEFAULT CURRENT_DATE,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_academia) REFERENCES academia(id_academia) ON DELETE SET NULL
);

CREATE TABLE plano 
( 
    id_plano SERIAL PRIMARY KEY, 
    id_plano SERIAL PRIMARY KEY, 
    tipo VARCHAR(255) NOT NULL,  
    valor FLOAT NOT NULL,  
    id_academia INT,
    dias_validade INT NOT NULL,
    data_criacao DATE DEFAULT CURRENT_DATE,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_academia) REFERENCES academia(id_academia) ON DELETE SET NULL
);

CREATE TABLE treino 
( 
    id_treino SERIAL PRIMARY KEY, 
    id_treino SERIAL PRIMARY KEY, 
    nome VARCHAR(255) NOT NULL,  
    descricao VARCHAR(255),  
    id_administrador INT,
    data_criacao DATE DEFAULT CURRENT_DATE,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_administrador) REFERENCES administrador(id_adm) ON DELETE SET NULL
);

CREATE TABLE exercicio 
( 
    id_exercicio SERIAL PRIMARY KEY, 
    id_exercicio SERIAL PRIMARY KEY, 
    nome VARCHAR(255) NOT NULL,  
    descricao VARCHAR(255),  
    id_administrador INT,
    gif_url VARCHAR(255),
    data_criacao DATE DEFAULT CURRENT_DATE,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_administrador) REFERENCES administrador(id_adm) ON DELETE SET NULL
);

CREATE TABLE aluno 
( 
    id_aluno SERIAL PRIMARY KEY, 
    id_aluno SERIAL PRIMARY KEY, 
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
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_academia) REFERENCES academia(id_academia) ON DELETE SET NULL,
    FOREIGN KEY (id_treino) REFERENCES treino(id_treino) ON DELETE SET NULL,
    FOREIGN KEY (id_plano) REFERENCES plano(id_plano) ON DELETE SET NULL
);

CREATE TABLE dia (
    id_dia SERIAL PRIMARY KEY,
    id_dia SERIAL PRIMARY KEY,
    nome VARCHAR(10) NOT NULL
);

CREATE TABLE venda 
( 
    id_venda SERIAL PRIMARY KEY, 
    id_venda SERIAL PRIMARY KEY, 
    nome VARCHAR(255) NOT NULL,  
    metodo_pagamento VARCHAR(50) NOT NULL,  
    data_venda DATE NOT NULL,
    data_criacao DATE DEFAULT CURRENT_DATE,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE produto 
( 
    id_produto SERIAL PRIMARY KEY, 
    id_produto SERIAL PRIMARY KEY, 
    nome VARCHAR(255) NOT NULL,  
    valor FLOAT NOT NULL,  
    descricao VARCHAR(255),  
    quantidade INT NOT NULL,  
    id_academia INT,
    data_criacao DATE DEFAULT CURRENT_DATE,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_academia) REFERENCES academia(id_academia) ON DELETE SET NULL
);

CREATE TABLE aviso 
( 
    id_aviso SERIAL PRIMARY KEY, 
    id_aviso SERIAL PRIMARY KEY, 
    titulo VARCHAR(255) NOT NULL,  
    descricao VARCHAR(255),  
    id_academia INT,
    gif_url VARCHAR(255),
    data_criacao DATE DEFAULT CURRENT_DATE,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_expiracao TIMESTAMP,
    FOREIGN KEY (id_academia) REFERENCES academia(id_academia) ON DELETE SET NULL
);

CREATE TABLE avaliacao 
( 
    id_avaliacao SERIAL PRIMARY KEY, 
    id_avaliacao SERIAL PRIMARY KEY,
    obj TEXT,
    idadeMeta FLOAT,
    rcq FLOAT,
    tmb FLOAT, 
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
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_venda) REFERENCES venda(id_venda) ON DELETE CASCADE,
    FOREIGN KEY (id_produto) REFERENCES produto(id_produto) ON DELETE CASCADE
);

CREATE TABLE treino_dia_exercicio (
    id_treino INT NOT NULL,
    id_dia INT NOT NULL,
    id_exercicio INT NOT NULL,
    repeticoes INT NULL,
    series INT NULL,
    FOREIGN KEY (id_dia) REFERENCES dia(id_dia) ON DELETE CASCADE,
    FOREIGN KEY (id_exercicio) REFERENCES exercicio(id_exercicio) ON DELETE CASCADE,
    FOREIGN KEY (id_treino) REFERENCES treino(id_treino) ON DELETE CASCADE
);

CREATE TABLE periodo_semana (
    id_periodo_semana SERIAL PRIMARY KEY,
    dia_semana VARCHAR(10) NOT NULL, 
    periodo VARCHAR(10) NOT NULL
);

CREATE TABLE horario (
    id_horario SERIAL PRIMARY KEY,
    id_academia INTEGER REFERENCES academia(id_academia),
    id_periodo_semana INTEGER REFERENCES periodo_semana(id_periodo_semana),
    hora_abertura TIME NOT NULL,
    hora_fechamento TIME NOT NULL
);


INSERT INTO periodo_semana (dia_semana, periodo) VALUES
('Segunda', 'Manhã'),
('Segunda', 'Tarde'),
('Segunda', 'Noite'),
('Terça', 'Manhã'),
('Terça', 'Tarde'),
('Terça', 'Noite'),
('Quarta', 'Manhã'),
('Quarta', 'Tarde'),
('Quarta', 'Noite'),
('Quinta', 'Manhã'),
('Quinta', 'Tarde'),
('Quinta', 'Noite'),
('Sexta', 'Manhã'),
('Sexta', 'Tarde'),
('Sexta', 'Noite'),
('Sábado', 'Manhã'),
('Sábado', 'Tarde'),
('Sábado', 'Noite'),
('Domingo', 'Manhã'),
('Domingo', 'Tarde'),
('Domingo', 'Noite');

INSERT INTO dia(nome) values ('Dia 1'), ('Dia 2'), ('Dia 3'), ('Dia 4'), ('Dia 5'),('Dia 6'),('Dia 7')

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.data_atualizacao = NOW();
   RETURN NEW;
   NEW.data_atualizacao = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_aluno_timestamp_trigger
BEFORE UPDATE ON aluno
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_administrador_timestamp_trigger
BEFORE UPDATE ON administrador
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_exercicio_timestamp_trigger
BEFORE UPDATE ON exercicio
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_treino_timestamp_trigger
BEFORE UPDATE ON treino
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_venda_timestamp_trigger
BEFORE UPDATE ON venda
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_produto_timestamp_trigger
BEFORE UPDATE ON produto
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_aviso_timestamp_trigger
BEFORE UPDATE ON aviso
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_academia_timestamp_trigger
BEFORE UPDATE ON academia
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_plano_timestamp_trigger
BEFORE UPDATE ON plano
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_avaliacao_timestamp_trigger
BEFORE UPDATE ON avaliacao
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
EXECUTE FUNCTION update_timestamp();
