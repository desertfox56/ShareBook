# syntax=docker/dockerfile:1

ARG PYTHON_VERSION=3.11.4
FROM python:${PYTHON_VERSION}-slim as base

# Prevents Python from writing pyc files to the disk. It reduces the size of the image.
ENV PYTHONDONTWRITEBYTECODE=1

# Keeps Python from buffering stdout and stderr. It helps in logging.
ENV PYTHONUNBUFFERED=1

# Set the timezone
ENV TZ=Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

# Create a non-privileged user to run the application securely.
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

# Install system packages that might be required for building some Python packages.
# Also, cleaning up the APT cache after installations to reduce image size.
RUN apt-get update && apt-get install -y gcc libffi-dev libssl-dev && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

ENV PATH="/root/.local/bin:${PATH}"

# Install gunicorn
RUN python -m pip install gunicorn

# Download and install dependencies from requirements.txt.
RUN --mount=type=cache,target=/root/.cache/pip \
    --mount=type=bind,source=requirements.txt,target=requirements.txt \
    python -m pip install -r requirements.txt
    
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

