# Базовый образ
FROM node:16-alpine as build

# Установка рабочей директории в контейнере
WORKDIR /app

# Копирование файлов проекта
COPY package.json package-lock.json ./

# Установка зависимостей
RUN npm install

# Копирование оставшихся файлов проекта
COPY . .

EXPOSE  3000

CMD ["npm", "start"]
# Сборка приложения
#RUN npm run build

# Стадия для продакшена с использованием nginx
#FROM nginx:alpine

# Копирование собранных файлов приложения
#COPY --from=build /app/build /usr/share/nginx/html

# Перенаправление всех запросов на index.html
#RUN echo "server { listen 80; location / { root /usr/share/nginx/html; index index.html index.htm; try_files \$uri /index.html; } }" > /etc/nginx/conf.d/default.conf

# Открытие 80 порта
#EXPOSE 80

# Запуск nginx
#CMD ["nginx", "-g", "daemon off;"]
