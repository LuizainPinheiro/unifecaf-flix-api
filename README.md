API UniFECAF Flix

Esta é a API RESTful desenvolvida para o projeto UniFECAF Flix, uma plataforma de streaming. A API é responsável por gerenciar o catálogo de filmes, oferecendo operações CRUD (Create, Read, Update, Delete) sobre o recurso Filme.

💻 Stack Tecnológica

Backend: Node.js

Framework: Express

Banco de Dados: MySQL

ORM: Prisma

Padrão Arquitetural: Model-View-Controller (MVC)

Estilo Arquitetural: RESTful

🚀 Como Executar o Projeto

Clone o repositório:

git clone [LINK DO SEU REPOSITÓRIO]
cd unifecaf-flix-api


Instale as dependências:

npm install


Configure o Banco de Dados:

Crie o arquivo .env com suas credenciais do MySQL.

Execute as migrações do Prisma para criar o banco de dados e a tabela Filme.

Execute o servidor:

npm start


O servidor estará rodando em http://localhost:3000.

Endpoints Principais (Base URL: /v1/controle-filmes/filme)

Método

Endpoint

Descrição

GET

/

Lista todos os filmes.

GET

/:id

Busca um filme pelo ID.

POST

/

Cria um novo filme.

PUT

/:id

Atualiza um filme existente.

DELETE

/:id

Exclui um filme.
