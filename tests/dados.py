from datetime import datetime, timedelta
import random

hoje = datetime.now()

def popula_session(filme, num, status=1):
    sessoes = []
    for i in range(num):
        sessao = {
            "filme_id": filme,
            "sala_id": random.choice([1, 2]),
            "horario": hoje + (random.choice([timedelta(hours=random.randint(0, 24)), timedelta(days=random.randint(0, 7))])) * status,
        }
        sessoes.append(sessao)

    return sessoes

filmes = [{
    "titulo": "Batman", #id 1
    "poster": "https://img.elo7.com.br/product/original/3FBA809/big-poster-filme-batman-2022-90x60-cm-lo002-poster-batman.jpg",
    "widescreen": "https://i.pinimg.com/736x/ff/6d/2c/ff6d2c13fd27be788770e7e976cdbd34.jpg",
    "descricao": "Batman is called to intervene when the mayor of Gotham City is murdered. Soon, his investigation leads him to uncover a web of corruption, linked to his own dark past.",
    "status": 1,
    "genero": "Action",
    "idade_min": 18
}, {
    "titulo": "Homem Aranha", #id 2
    "poster": "https://cdn.awsli.com.br/1000x1000/1610/1610163/produto/135086200/poster-spider-man-sem-volta-para-casa-no-way-home-c-2b97947a.jpg",
    "widescreen": "https://images4.alphacoders.com/844/thumb-1920-844967.jpg",
    "descricao": "Peter Parker's life changes when he is bitten by a genetically altered spider and gains superpowers. He uses his powers to help people and finds himself facing the Green Goblin, an evil maniac.",
    "status": 0,
    "genero": "Action",
    "idade_min": 13
}, {
    "titulo": "Iron Man", #id 3
    "poster": "https://img.elo7.com.br/product/main/1DFB172/poster-cartaz-iron-man-homem-de-ferro-colecao.jpg",
    "widescreen": "https://images8.alphacoders.com/282/282535.jpg",
    "descricao": "When Tony Stark, an industrialist, is captured, he constructs a high-tech armoured suit to escape. Once he manages to escape, he decides to use his suit to fight against evil forces to save the world.",
    "status": 1,
    "genero": "Action",
    "idade_min": 13
}, {
    "titulo": "Jujutsu Kaisen 0", #id 4
    "poster": "https://ingresso-a.akamaihd.net/prd/img/movie/jujutsu-kaise/93bdb267-d11f-4631-8581-b75d93d37c19.jpg",
    "widescreen": "https://www.geeklando.com.br/wp-content/uploads/2021/06/Jujutsu-Kaisen-0-Nova-imagem-do-filme-e-data-de-estreia-reveladas.jpg",
    "descricao": "Yuta Okkotsu gains control of an extremely powerful, cursed spirit and gets enrolled in the Tokyo Prefectural Jujutsu High School by sorcerers to help him control his power and keep an eye on him.",
    "status": 0,
    "genero": "Animation",
    "idade_min": 16
}, {
    "titulo": "Sonic 2", #id5
    "poster": " https://br.web.img3.acsta.net/c_310_420/pictures/21/12/08/15/46/3923761.jpg",
    "widescreen": "https://t.ctcdn.com.br/jH5U3U-he2dZUzXotxoZ6aLv6Zk=/700x394/smart/filters:format(webp)/i247345.png",
    "descricao": "After settling in Green Hills, Sonic is eager to prove that he has what it takes to be a true hero. His test comes when Dr. Robotnik returns with a new partner, Knuckles, in search of a mystical emerald that has the power to destroy civilizations.",
    "status": 1,
    "genero": "Action",
    "idade_min": 12
}, {
    "titulo": "O Poderoso Chefão", #id 6
    "poster": "https://br.web.img3.acsta.net/medias/nmedia/18/90/93/20/20120876.jpg",
    "widescreen": "https://www.metalpiracicaba.com.br/wp-content/uploads/2018/04/marlon-1-696x407.jpg",
    "descricao": "Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.",
    "status": 0,
    "genero": "Mafia",
    "idade_min": 18
}, {
    "titulo": "Metal Lords", #id 7
    "poster": "https://p2.trrsf.com/image/fget/cf/940/0/images.terra.com/2022/03/10/907196182-metal-lords-poster.jpg",
    "widescreen": "https://www.proibidoler.com/wp-content/uploads/2022/04/critica-metal-lords-2022-netflix-4-364x205.jpg",
    "descricao": "A gang of metal-clad mercenaries are forced to fight against the evil forces of the United States government, while their lives are threatened by a mysterious new enemy.",
    "status": 2,
    "genero": "Drama",
    "idade_min": 12
}, {
    "titulo": "Águas Profundas", #id 8
    "poster": "https://br.web.img3.acsta.net/pictures/22/02/15/10/04/5157285.jpg",
    "widescreen": "https://studiosol-a.akamaihd.net/uploadfile/letras/playlists/3/3/1/9/3319ec200e3b4046a4622e349b2aa719.jpg",
    "descricao": "Vic and Melinda, a married couple, fall out of love with each other and the latter pursues extramarital affairs. However, when her lovers all disappear, the suspicion falls on Vic.",
    "status": 2,
    "genero": "Thriller",
    "idade_min": 18
}, {
    "titulo": "Pânico", #id 9
    "poster": "https://br.web.img3.acsta.net/pictures/21/10/13/21/56/4755833.jpg",
    "widescreen": "https://rollingstone.uol.com.br/media/uploads/panico_5_foto_divulgacao.jpg",
    "descricao": "A vida de um jovem é interrompida quando ele se encontra com uma pessoa que o torna um homem de verdade.",
    "status": 2,
    "genero": "Suspense",
    "idade_min": 18
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


sessoes = popula_session(1, 8)
sessoes += popula_session(3, 8)
sessoes += popula_session(5, 8)
sessoes += popula_session(2, 4, -1)
sessoes += popula_session(4, 4, -1)
sessoes += popula_session(6, 4, -1)

clientes = [{
    'nome': 'Lorem',
    'email': 'lorem@email.com',
    'senha': 'teste123'
}, {
    'nome': 'Ipsum',
    'email': 'ipsum@email.com',
    'senha': 'teste123'
}, {
    'nome': 'Dolor',
    'email': 'dolor@email.com',
    'senha': 'teste123'
}, {
    'nome': 'Sit',
    'email': 'sit@email.com',
    'senha': 'teste123'
}]

produtos = [{
    'nome': 'Ingresso',
    "imagem": "https://www.tag-id.com.br/wp-content/uploads/2017/10/ingresso_banner.jpg",
    'valor': 10.00,
    "pontos_retorno": 1,
    "descricao": "Preço padrão de ingressos para filmes.",
    "estoque": 30,
    "is_ingresso": 1,
    "pontos_custo": 10
},{
    'nome': 'Pipoca',
    "imagem": "https://cdn.cineflix.com.br/bombo/7012/t_webp/produto_7012.webp",
    'valor': 20.00,
    "pontos_retorno": 2,
    "descricao": "Balde de pipoca 500g.",
    "estoque": 30,
    "is_ingresso": 0,
    "pontos_custo": 10
}, {
    'nome': 'Kit Kat',
    "imagem": "https://cdn.cineflix.com.br/bombo/2064/t_webp/produto_2064.webp",
    'valor': 5.00,
    "pontos_retorno": 2,
    "descricao": "Chocolate Kit Kat 41,5g",
    "estoque": 20,
    "is_ingresso": 0,
    "pontos_custo": 5
}, {
    'nome': 'Água',
    "imagem": "https://cdn.cineflix.com.br/bombo/2004/t_webp/produto_2004.webp",
    'valor': 5.00,
    "pontos_retorno": 2,
    "descricao": "Garrafa de 500ml de água sem gás.",
    "estoque": 30,
    "is_ingresso": 0,
    "pontos_custo": 5
}, {
    'nome': 'Energético',
    "imagem": "https://cdn.cineflix.com.br/bombo/77053012/t_webp/produto_77053012.webp",
    'valor': 8.00,
    "pontos_retorno": 2,
    "descricao": "Energético Monster 473ml.",
    "estoque": 5,
    "is_ingresso": 0,
    "pontos_custo": 10
}]
