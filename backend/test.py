import psycopg2

# Параметры подключения
host = "mouse.db.elephantsql.com"
port = 5432
database = "tkvvetoe"
user = "tkvvetoe"
password = "htz-DcDZtnX0BdSImqB1UcYnz6kyFMk9"

try:
    # Установка соединения
    connection = psycopg2.connect(
        host=host,
        port=port,
        database=database,
        user=user,
        password=password
    )

    # Если подключение успешно, выведите сообщение об успешном подключении
    print("Успешное подключение к базе данных PostgreSQL")

    # Закрытие соединения
    connection.close()

except psycopg2.Error as error:
    # Если произошла ошибка при подключении, выведите сообщение об ошибке
    print("Ошибка при подключении к базе данных PostgreSQL:", error)
