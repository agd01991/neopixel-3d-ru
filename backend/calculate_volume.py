import os
import struct
import sys
import json

def dot(x, y):
    cos = sum([x[i]*y[i] for i in range(len(x))])   
    if cos == 0:
        return 0
    if cos < 0:
        return -1
    if cos > 0:
        return 1 


def calculate_volume(stl_file_path):
    with open(stl_file_path, 'rb') as stl_file:
        stl_file.read(80)  # Пропускаем заголовок файла

        # Читаем количество треугольников (32-битное беззнаковое целое число, little-endian)
        num_triangles = struct.unpack('<I', stl_file.read(4))[0]

        volume = 0.0
        for _ in range(num_triangles):
            # Читаем нормаль треугольника (3 значения типа float, little-endian)
            normals = struct.unpack('<3f', stl_file.read(12))
            # Читаем вершины треугольника (9 значения типа float, little-endian)
            vertices = struct.unpack('<9f', stl_file.read(36))

            # Распаковываем координаты вершин и нормалей
            x1, y1, z1, x2, y2, z2, x3, y3, z3 = vertices
            normal_x, normal_y, normal_z = normals

            # Считаем середину треугольника и создаем вектор из нормалей
            trig_center = [(x1 + x2 + x3)/3, (y1 + y2 + y3)/3, (z1 + z2 + z3)/3]
            normal_vector = [trig_center[0] + normal_x, trig_center[1] + normal_y,trig_center[2] + normal_z]
             

            # Вычисляем объем параллелепипеда, образованного треугольником и началом координат
            par_vol =  x1 * y2 * z3 - x1 * y3 * z2 - x2 * y1 * z3 + x2 * y3 * z1 + x3 * y1 * z2 - x3 * y2 * z1
            volume -= dot(trig_center, normal_vector) * par_vol
            
            # Отладка вершин
            #print(normal_vector,"||",normal_x,normal_y,normal_z,"||",x1,y1,z1,"|",x2,y2,z2,"|",x3,y3,z3)

            # Читаем атрибут треугольника (2 байта, игнорируем)
            stl_file.read(2)

    # Отнимаем объем треугольников, близких к нулевому (например, плоские треугольники)
    volume = abs(volume / 6)

    return volume


# Получаем путь к файлу STL из аргументов командной строки
stl_file_path = "C:\\untitled1.stl" # sys.argv[1]
# Вычисляем объем модели
model_volume = calculate_volume(stl_file_path)
print(model_volume)

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