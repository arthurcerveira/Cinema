from datetime import datetime, timedelta

hoje = datetime.now()

filmes = [{
    "titulo": "Batman",
    "poster": "https://img.elo7.com.br/product/original/3FBA809/big-poster-filme-batman-2022-90x60-cm-lo002-poster-batman.jpg",
    "widescreen": "https://i.pinimg.com/736x/ff/6d/2c/ff6d2c13fd27be788770e7e976cdbd34.jpg",
    "descricao": "Filme do Batman",
    "status": 1,
    "genero": "Ação",
    "idade_min": 18
}, {
    "titulo": "Homem Aranha",
    "poster": "https://cdn.awsli.com.br/1000x1000/1610/1610163/produto/135086200/poster-spider-man-sem-volta-para-casa-no-way-home-c-2b97947a.jpg",
    "widescreen": "https://images4.alphacoders.com/844/thumb-1920-844967.jpg",
    "descricao": "Filme do Homem Aranha",
    "status": 0,
    "genero": "Ação",
    "idade_min": 13
}, {
    "titulo": "Iron Man",
    "poster": "https://img.elo7.com.br/product/main/1DFB172/poster-cartaz-iron-man-homem-de-ferro-colecao.jpg",
    "widescreen": "https://images8.alphacoders.com/282/282535.jpg",
    "descricao": "Filme do Iron Man",
    "status": 1,
    "genero": "Ação",
    "idade_min": 13
}]

salas = [{
    "filas": 10,
    "colunas": 10,
    "numero": 1
}, {
    "filas": 15,
    "colunas": 10,
    "numero": 2
}]

sessoes = [{
    "horario": hoje - timedelta(days=3),
    "sala_id": 1,
    "filme_id": 2
}, {
    "horario": hoje - timedelta(days=1),
    "sala_id": 1,
    "filme_id": 1
}, {
    "horario": hoje + timedelta(days=1),
    "sala_id": 1,
    "filme_id": 1
}, {
    "horario": hoje + timedelta(days=2),
    "sala_id": 2,
    "filme_id": 3
}, {
    "horario": hoje + timedelta(days=3),
    "sala_id": 1,
    "filme_id": 1
}, {
    "horario": hoje + timedelta(days=3, hours=2),
    "sala_id": 2,
    "filme_id": 3
}, {
    "horario": hoje + timedelta(days=4),
    "sala_id": 1,
    "filme_id": 1
}, {
    "horario": hoje + timedelta(days=5),
    "sala_id": 2,
    "filme_id": 3
}]

clientes = [{
    'nome': 'Lorem',
    'email': 'lorem@email.com',
    'senha': 'teste'
}, {
    'nome': 'Ipsum',
    'email': 'ipsum@email.com',
    'senha': 'teste'
}, {
    'nome': 'Dolor',
    'email': 'dolor@email.com',
    'senha': 'teste'
}, {
    'nome': 'Sit',
    'email': 'sit@email.com',
    'senha': 'teste'
}]

produtos = [{
    'nome': 'Pipoca',
    "imagem": "https://cdn.cineflix.com.br/bombo/7012/t_webp/produto_7012.webp",
    'valor': 20.00,
    "pontos_retorno": 2,
    "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "estoque": 30,
    "is_ingresso": 0,
    "pontos_custo": 10
}, {
    'nome': 'Kit Kat',
    "imagem": "https://cdn.cineflix.com.br/bombo/2064/t_webp/produto_2064.webp",
    'valor': 5.00,
    "pontos_retorno": 2,
    "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "estoque": 20,
    "is_ingresso": 0,
    "pontos_custo": 5
}, {
    'nome': 'Água',
    "imagem": "https://cdn.cineflix.com.br/bombo/2004/t_webp/produto_2004.webp",
    'valor': 5.00,
    "pontos_retorno": 2,
    "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "estoque": 30,
    "is_ingresso": 0,
    "pontos_custo": 5
}, {
    'nome': 'Energético',
    "imagem": "https://cdn.cineflix.com.br/bombo/77053012/t_webp/produto_77053012.webp",
    'valor': 8.00,
    "pontos_retorno": 2,
    "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "estoque": 5,
    "is_ingresso": 0,
    "pontos_custo": 10
}]
