import os
import struct
import sys
import json

def calculate_volume(stl_file_path):
    with open(stl_file_path, 'rb') as stl_file:
        stl_file.read(80)  # Пропускаем заголовок файла

        # Читаем количество треугольников (32-битное беззнаковое целое число, little-endian)
        num_triangles = struct.unpack('<I', stl_file.read(4))[0]

        volume = 0.0
        for _ in range(num_triangles):
            # Читаем нормаль треугольника (3 значения типа float, little-endian)
            stl_file.read(12)

            # Читаем вершины треугольника (9 значения типа float, little-endian)
            vertices = struct.unpack('<9f', stl_file.read(36))

            # Распаковываем координаты вершин
            x1, y1, z1, x2, y2, z2, x3, y3, z3 = vertices

            # Вычисляем объем параллелепипеда, образованного треугольником и началом координат
            volume += x1 * y2 * z3 - x1 * y3 * z2 - x2 * y1 * z3 + x2 * y3 * z1 + x3 * y1 * z2 - x3 * y2 * z1

            # Читаем атрибут треугольника (2 байта, игнорируем)
            stl_file.read(2)

    # Отнимаем объем треугольников, близких к нулевому (например, плоские треугольники)
    volume = abs(volume / 6)

    return volume


# Получаем путь к файлу STL из аргументов командной строки
stl_file_path = sys.argv[1]

# Вычисляем объем модели
model_volume = calculate_volume(stl_file_path)

# Пересчитываем объем в сантиметры кубические
scale_factor = 0.1  # Масштаб модели (в данном примере предполагается, что 1 единица = 1 см)
model_volume_cm3 = model_volume * scale_factor**3
model_volume_cm3_2 = round(model_volume_cm3, 2)
# Создаем словарь с результатом
result = (model_volume_cm3_2)

# Преобразуем словарь в JSON строку
json_result = json.dumps(result)

# Выводим результат в стандартный вывод
print(json_result)
