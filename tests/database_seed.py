import requests

from dados import filmes, salas, sessoes, clientes


url_base = 'http://localhost:5000/'


def cria_admin():
    print("Cria admin")

    url = url_base + 'admin'
    payload = {'usuario': 'admin', 'senha': 'admin'}

    response = requests.post(url, json=payload)

    print(response.json())


def admin_login():
    print("\nFaz login do admin")

    url = url_base + 'admin/login'
    payload = {'usuario': 'admin', 'senha': 'admin'}

    response = requests.post(url, json=payload)

    print(response.json())

    return response.json()['token']


def cria_filmes(header):
    print("\nCria filmes")
    url = url_base + 'filme'

    for filme in filmes:
        response = requests.post(url, json=filme, headers=header)
        print(response.json())


def cria_salas(header):
    print("\nCria salas")

    url = url_base + 'sala'

    for sala in salas:
        response = requests.post(url, json=sala, headers=header)
        print(response.json())


def cria_sessoes(header):
    print("\nCria sessões")

    url = url_base + 'sessao'

    for sessao in sessoes:
        sessao["horario"] = sessao["horario"].strftime("%Y-%m-%d %H:%M:%S")
        response = requests.post(url, json=sessao, headers=header)
        print(response.json())


def cria_clientes(header):
    print("\nCria clientes")

    url = url_base + 'cliente'

    for cliente in clientes:
        response = requests.post(url, json=cliente, headers=header)
        print(response.json())


if __name__ == '__main__':
    cria_admin()

    token = admin_login()
    header = {'Authorization': token}

    cria_filmes(header)
    cria_salas(header)
    cria_sessoes(header)
    cria_clientes(header)

    print("\nTodos os objetos foram criados")
