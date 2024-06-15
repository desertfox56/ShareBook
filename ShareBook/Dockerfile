# syntax=docker/dockerfile:1

ARG PYTHON_VERSION=3.11.4
FROM python:${PYTHON_VERSION}-slim as base

<<<<<<< HEAD
# Prevents Python from writing pyc files to the disk. It reduces the size of the image.
ENV PYTHONDONTWRITEBYTECODE=1

# Keeps Python from buffering stdout and stderr. It helps in logging.
ENV PYTHONUNBUFFERED=1

# Set the timezone
ENV TZ=Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

# Create a non-privileged user to run the application securely.
=======
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
>>>>>>> backup-branch
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

<<<<<<< HEAD
# Install system packages that might be required for building some Python packages.
# Also, cleaning up the APT cache after installations to reduce image size.
RUN apt-get update && apt-get install -y gcc libffi-dev libssl-dev && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

ENV PATH="/root/.local/bin:${PATH}"

# Install gunicorn, celery, redis
RUN python -m pip install gunicorn celery redis

# Download and install dependencies from requirements.txt.
=======
# Устанавливаем системные пакеты, которые могут потребоваться для сборки некоторых Python пакетов.
# Также очищаем кэш APT после установки для уменьшения размера образа.
RUN apt-get update && apt-get install -y gcc libffi-dev libssl-dev && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Устанавливаем путь для pip
ENV PATH="/root/.local/bin:${PATH}"

# Устанавливаем gunicorn, celery, redis
RUN python -m pip install gunicorn celery redis

# Загружаем и устанавливаем зависимости из requirements.txt.
>>>>>>> backup-branch
RUN --mount=type=cache,target=/root/.cache/pip \
    --mount=type=bind,source=requirements.txt,target=requirements.txt \
    python -m pip install -r requirements.txt
    
<<<<<<< HEAD
# Copy the entire source code into the container.
COPY . .

# Set permissions for the /app directory to ensure appuser can write to it
RUN chown -R appuser:appuser /app

# Switching to the non-privileged user for better security.
USER appuser

# Mentioning the port on which the application will run.
EXPOSE 8000

# Command to run the application when the container starts.
CMD ["gunicorn", "ShareBook.wsgi:application", "--bind=0.0.0.0:8000"]
=======
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
>>>>>>> backup-branch

