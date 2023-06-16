# ACL API

API para controle de acesso e listas.

## Configuração

Certifique-se de ter o Node.js e o npm instalados em sua máquina.

1. Faça o clone deste repositório: `git clone https://github.com/seu-usuario/acl-api.git`
2. Navegue até o diretório do projeto: `cd acl-api`
3. Instale as dependências: `npm install`
4. Configure as variáveis de ambiente no arquivo `.env` com as seguintes informações:
   - `PORT`: porta em que o servidor será executado (padrão: 3000)
5. Inicie o servidor: `npm start`

## Rotas

A API possui as seguintes rotas:

### Usuário

- `POST /register`: Registrar um novo usuário. Requer um objeto JSON contendo `username` (string), `password` (string) e `isAdmin` (boolean).
- `POST /login`: Efetuar login de usuário. Requer um objeto JSON contendo `username` (string) e `password` (string).

### Lista

- `POST /list`: Criar uma nova lista. Requer autenticação com token JWT no cabeçalho da requisição.
- `GET /list`: Obter todas as listas. Requer autenticação com token JWT no cabeçalho da requisição.
- `DELETE /list/{id}`: Excluir uma lista pelo ID. Requer autenticação com token JWT no cabeçalho da requisição.
- `PUT /list/{id}`: Atualizar uma lista pelo ID. Requer autenticação com token JWT no cabeçalho da requisição e um objeto JSON contendo o campo `name` (string).

### Administração

- `GET /users`: Obter todos os usuários. Requer autenticação com token JWT no cabeçalho da requisição.

## Segurança

A API utiliza autenticação baseada em tokens JWT (JSON Web Tokens). Para acessar rotas protegidas, é necessário enviar um token JWT válido no cabeçalho da requisição:

- Authorization: Bearer {token}

## Documentação da API

- `GET /api-docs`: Documentação da API no formato Swagger UI.

A documentação da API, incluindo detalhes sobre todas as rotas, parâmetros e respostas, pode ser encontrada no arquivo [swagger.json](./swagger.json). Você pode importar este arquivo no Swagger UI ou em outras ferramentas de documentação para visualizar e interagir com a API de forma mais amigável.

## Contribuição

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver alguma sugestão, fique à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
