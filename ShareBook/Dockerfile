# syntax=docker/dockerfile:1

ARG PYTHON_VERSION=3.11.4
FROM python:${PYTHON_VERSION}-slim as base

# Отключаем запись pyc файлов на диск. Это уменьшает размер образа.
ENV PYTHONDONTWRITEBYTECODE=1

# Отключаем буферизацию stdout и stderr в Python. Это помогает в логировании.
ENV PYTHONUNBUFFERED=1

# Устанавливаем часовой пояс
ENV TZ=Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Устанавливаем рабочую директорию
WORKDIR /app

# Создаем непривилегированного пользователя для запуска приложения безопасно
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

# Устанавливаем системные пакеты, которые могут потребоваться для сборки некоторых Python пакетов.
# Также очищаем кэш APT после установки для уменьшения размера образа.
RUN apt-get update && apt-get install -y gcc libffi-dev libssl-dev && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Устанавливаем путь для pip
ENV PATH="/root/.local/bin:${PATH}"

# Устанавливаем gunicorn, celery, redis
RUN python -m pip install gunicorn celery redis

# Загружаем и устанавливаем зависимости из requirements.txt.
RUN --mount=type=cache,target=/root/.cache/pip \
    --mount=type=bind,source=requirements.txt,target=requirements.txt \
    python -m pip install -r requirements.txt
    
# Копируем весь исходный код в контейнер.
COPY . .

# Копируем скрипт entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Устанавливаем права для директории /app, чтобы appuser мог писать в нее
RUN chown -R appuser:appuser /app

# Указываем порт, на котором будет работать приложение.
EXPOSE 8000

# Устанавливаем права для директории миграций, чтобы appuser мог писать в нее
RUN chmod -R 777 /app/marketplace/migrations/

# Указываем начальную точку выполнения
ENTRYPOINT ["/entrypoint.sh"]

# Переключаемся на непривилегированного пользователя для повышения безопасности.
USER appuser

# Команда для запуска приложения при старте контейнера.
CMD ["gunicorn", "ShareBook.wsgi:application", "--bind=0.0.0.0:8000","--log-level", "debug"]

