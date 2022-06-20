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

A inicialização do banco de dados pode ser um processo demorado, e é possível verificar seu status nos logs do container.

```bash
$ docker logs cinema
```

A linha `[Server] /usr/sbin/mysqld: ready for connections. Version: '8.0.29' socket: '/var/run/mysqld/mysqld.sock' port: 3306 MySQL Community Server - GPL.` indica que o banco de dados está pronto para receber conexões.

### Executando a API

A API pode ser executada com npm.

```bash
$ npm start
```

A API agora estará sendo executada no endereço `localhost:5000/`.

### Seed do banco de dados

Foi criada uma seed para adicionar dados ao banco de dados. Para isso, é necessário possuir Python com a biblioteca requests instalados, e a API deve estar sendo executada.

```bash
$ cd tests
$ python database_seed.py
```