-- Criação da tabela
CREATE TABLE times_brasileirao_2024 (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    sigla VARCHAR(3) NOT NULL,
    pontos INTEGER DEFAULT 0,
    vitorias INTEGER DEFAULT 0,
    derrotas INTEGER DEFAULT 0,
    empates INTEGER DEFAULT 0,
    gols_marcados INTEGER DEFAULT 0,
    gols_sofridos INTEGER DEFAULT 0,
    saldo_gols INTEGER GENERATED ALWAYS AS (gols_marcados - gols_sofridos) STORED
);

-- Inserção dos times (dados iniciais com estatísticas zeradas)
INSERT INTO times_brasileirao_2024 
(nome, sigla, pontos, vitorias, derrotas, empates, gols_marcados, gols_sofridos)
VALUES
('Flamengo', 'FLA', 0, 0, 0, 0, 0, 0),
('Palmeiras', 'PAL', 0, 0, 0, 0, 0, 0),
('Atlético Mineiro', 'CAM', 0, 0, 0, 0, 0, 0),
('Grêmio', 'GRE', 0, 0, 0, 0, 0, 0),
('Fluminense', 'FLU', 0, 0, 0, 0, 0, 0),
('Botafogo', 'BOT', 0, 0, 0, 0, 0, 0),
('Bragantino', 'BGT', 0, 0, 0, 0, 0, 0),
('Athletico Paranaense', 'CAP', 0, 0, 0, 0, 0, 0),
('São Paulo', 'SAO', 0, 0, 0, 0, 0, 0),
('Internacional', 'INT', 0, 0, 0, 0, 0, 0),
('Fortaleza', 'FOR', 0, 0, 0, 0, 0, 0),
('Cuiabá', 'CUI', 0, 0, 0, 0, 0, 0),
('Corinthians', 'COR', 0, 0, 0, 0, 0, 0),
('Cruzeiro', 'CRU', 0, 0, 0, 0, 0, 0),
('Bahia', 'BAH', 0, 0, 0, 0, 0, 0),
('Vasco da Gama', 'VAS', 0, 0, 0, 0, 0, 0),
('Juventude', 'JUV', 0, 0, 0, 0, 0, 0),
('Criciúma', 'CRI', 0, 0, 0, 0, 0, 0),
('Atlético Goianiense', 'ACG', 0, 0, 0, 0, 0, 0),
('Vitória', 'VIT', 0, 0, 0, 0, 0, 0);