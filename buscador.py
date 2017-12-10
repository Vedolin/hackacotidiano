import requests
import pathlib
from bs4 import BeautifulSoup


topic = 'back-end'
base_url = 'https://www.empregos.com.br/curriculos/'+topic+'/p'
last_page_number = 3


pathlib.Path('./downloaded/' + topic + '/short').mkdir(parents=True)
pathlib.Path('./downloaded/' + topic + '/full').mkdir(parents=True)


def find_cvs(url, lista):
    r = requests.get(url)
    soup = BeautifulSoup(r.content, 'html.parser')
    lista_curriculos = soup.findAll("a", class_="nome-candidato")
    for curriculo in lista_curriculos:
        lista.append(curriculo.attrs['href'])
    return


lista = []
current_url = base_url
for current_page in range(last_page_number):
    current_url = base_url+str(current_page+1)
    find_cvs(current_url, lista)


base_url_modal = 'https://www.empregos.com.br/curriculos/modal/'
base_filename = 'curriculo'
current_modal = ''
txt_contents = ''


for cv_url in lista:
    current_modal = cv_url.split("/")[-1]
    base_file_name = cv_url.replace("https://www.", "").replace("/", "-")

    print('CV download: ' + base_file_name)
    
    r = requests.get(base_url_modal+current_modal, allow_redirects=True)

    soup = BeautifulSoup(r.content, 'html.parser')
    dados_curriculo=soup.findAll('span')

    html_text = str(dados_curriculo)
    soup = BeautifulSoup(html_text, "lxml")
    clean_html = ''.join(soup.findAll(text=True))

    open('./downloaded/' + topic + '/full/' + base_file_name + '.html', 'wb').write(r.content)
    open('./downloaded/' + topic + '/short/short_' + base_file_name + '.html', 'w').write(clean_html)
