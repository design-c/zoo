import requests
from bs4 import BeautifulSoup
import json
import os
import threading

# Функции для парсинга данных с HTML
def fetch_page(url):
    response = requests.get(url)
    response.encoding = 'utf-8'
    return response

def parse_latin_name(soup):
    latin_name_element = soup.select('.ar-main-top-inner .ar-subcaption')
    return latin_name_element[0].text.strip() if latin_name_element else None

def parse_area(soup):
    ar_title = soup.find('div', class_='ar-title', string='Ареал:')
    return ar_title.find_next_sibling('p').text.strip() if ar_title else None

def parse_classification(soup):
    classification = {}
    title = soup.find('div', class_='ar-title', string='Научная классификация:')
    if title:
        classification_list = title.find_next_sibling('ul', class_='ar-list-prop custom')
        if classification_list:
            for item in classification_list.find_all('li'):
                key = item.find('span').text.strip()
                value = item.find('b').text.strip()
                classification[key] = value
    return classification

def parse_guardian(soup):
    guardian_element = soup.select('.ar-wrp .ar-main .ar-main-bottom')
    guardian = guardian_element[0].text.strip() if guardian_element else None
    guardian_img = soup.select('.ar-wrp .ar-main .ar-main-bottom .ar-col-box-content img')
    guardian_img_src = guardian_img[0]['src'] if f"https://зоопарк.екатеринбург.рф/{guardian_img}" else None

    return guardian, guardian_img_src

def parse_description(soup):
    description = set()
    description_section = soup.select('.main-container .m3')
    if description_section:
        for paragraph in description_section[0].find_all('p'):
            description.add(paragraph.text.strip())
    return list(description)

def extract_animal_info(url, results, index):
    response = fetch_page(url)
    if response.status_code != 200:
        print(f'Ошибка при загрузке страницы: {response.status_code}')
        results[index] = None
        return

    soup = BeautifulSoup(response.text, 'html.parser')
    guardian, guardian_img_src = parse_guardian(soup)

    animal_info = {
        'latin_name': parse_latin_name(soup),
        'area': parse_area(soup),
        'classification': parse_classification(soup),
        'guardian': guardian,
        'guardian_img_src': guardian_img_src,
        'description': parse_description(soup)
    }

    results[index] = animal_info  # Записываем результаты в соответствующий индекс

# Чтение данных из файла JSON
def read_json_file(file_path):
    if not os.path.exists(file_path):
        print(f"Файл {file_path} не найден.")
        return []

    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)

    return data

# Запись данных в новый JSON файл
def write_to_file(data, output_file):
    with open(output_file, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, ensure_ascii=False, indent=4)
        print(f"Данные успешно записаны в {output_file}")

# Основная функция для обработки и объединения данных
def main():
    input_file = 'animals_data.json'  # Ваш файл с исходными данными
    output_file = 'merged_animal_info.json'  # Новый файл для записи объединенных данных

    # Чтение JSON данных
    data = read_json_file(input_file)
    if not data:
        return

    # Получаем все ссылки на details_link
    details_links = [item['details_link'] for item in data if 'details_link' in item]

    # Массив для хранения результатов
    results = [None] * len(details_links)

    # Список потоков
    threads = []

    # Создаем и запускаем потоки
    for i, link in enumerate(details_links):
        thread = threading.Thread(target=extract_animal_info, args=(link, results, i))
        threads.append(thread)
        thread.start()

    # Ожидаем завершения всех потоков
    for thread in threads:
        thread.join()

    # Объединяем данные из парсинга с исходными
    for i, result in enumerate(results):
        if result:
            data[i].update(result)  # Обновляем исходный объект новыми данными

    # Записываем результат в файл
    write_to_file(data, output_file)

if __name__ == '__main__':
    main()
