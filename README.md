# Cinema

## Instruções

Para executar esse projeto, é necessário possuir git, um banco de dados MySQL, node, e npm instalados.

Primeiro você deve clonar o repositório para sua máquina com git.

```bash
$ git clone https://github.com/arthurcerveira/Cinema.git
$ cd Cinema
```

Então é necessário instalar as dependências do projeto com npm.

```
$ npm install
```

### Inicializando o banco de dados

Esse projeto utiliza um banco de dados MySQL para o armazenamento dos dados. Esse banco de dados pode estar rodando localmente ou através de um container Docker. Abaixo está o comando utilizado para executar um container com MySQL.

```bash
$ docker build -t cinema_mysql .
$ docker run -p 3306:3306 --name cinema -d cinema_mysql
```

Para interromper a execução dos containers, basta executar o comando:

```bash
$ docker stop cinema
```

### Executando a API

A API pode ser executada com o npm.

```bash
$ npm start
```

A API agora estará sendo executada no endereço `localhost:5000/`.
