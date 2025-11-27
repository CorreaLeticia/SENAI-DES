CREATE DATABASE cantina_escolar;
USE cantina_escolar;

CREATE TABLE alunos (
    id_aluno INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    turma VARCHAR(20) NOT NULL
);

CREATE TABLE produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(6,2) NOT NULL
);

CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_aluno INT NOT NULL,
    data_pedido DATETIME NOT NULL,
    FOREIGN KEY (id_aluno) REFERENCES alunos(id_aluno)
);

CREATE TABLE pedido_itens (
    id_item INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade INT NOT NULL DEFAULT 1,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);

INSERT INTO alunos (nome, turma) VALUES
('Letícia Corrêa', '6A'),
('Mafer Oliveira', '7B'),
('Marina Defendi', '8A'),
('Murilo Jordan', '9C'),
('Miguel Gerbi', '6B');

INSERT INTO produtos (nome, preco) VALUES
('Coxinha', 4.50),
('Pastel de Carne', 5.00),
('Suco Natural', 3.50),
('Enroladinho', 4.00),
('Refrigerante', 6.00);

INSERT INTO pedidos (id_aluno, data_pedido) VALUES
(1, '2025-11-27 09:10:00'), 
(2, '2025-11-27 09:20:00'), 
(5, '2025-11-26 10:00:00'); 

INSERT INTO pedido_itens (id_pedido, id_produto, quantidade) VALUES
(1, 1, 2), 
(1, 3, 1);

INSERT INTO pedido_itens (id_pedido, id_produto, quantidade) VALUES
(2, 2, 1),
(2, 5, 1);

INSERT INTO pedido_itens (id_pedido, id_produto, quantidade) VALUES
(3, 4, 2);

1- Total de pedidos por produto

SELECT 
    produtos.nome AS 'Produto',
    COUNT(pedido_itens.id_item) AS 'Total de pedidos'
FROM produtos
LEFT JOIN pedido_itens ON produtos.id_produto = pedido_itens.id_produto
GROUP BY produtos.nome;
 
 2- Total gasto por aluno
 
 SELECT 
    alunos.id_aluno AS 'ID do aluno',
    alunos.nome AS 'Aluno',
    alunos.turma AS 'Turma',
    SUM(pedido_itens.quantidade * produtos.preco) AS 'Total gasto'
FROM alunos
LEFT JOIN pedidos ON alunos.id_aluno = pedidos.id_aluno
LEFT JOIN pedido_itens ON pedidos.id_pedido = pedido_itens.id_pedido
LEFT JOIN produtos ON pedido_itens.id_produto = produtos.id_produto
GROUP BY alunos.id_aluno, alunos.nome, alunos.turma
ORDER BY alunos.id_aluno;

3- Total Faturado pela cantina

SELECT 
    SUM(pedido_itens.quantidade * produtos.preco) AS 'Total faturado'
FROM pedido_itens
INNER JOIN produtos ON pedido_itens.id_produto = produtos.id_produto;
