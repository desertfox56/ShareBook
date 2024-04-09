# ShareBooks
ShareBooks is  online library platform allowing users to share books with one another.
# Stack
Backend: Django (Python)
Frontend: React.js
Database: PostgreSQL
Containerization: Docker
Web-Server: Nginx
Version Control: Git & GitHub
# Steps to start
1. Cloning a repository

git clone https://github.com/desertfox56/ShareBooks.git

2. Running using Docker

docker-compose up --build

This command will build and run all the necessary containers (Django, React, PostgreSQL).

3. Running without Docker
Backend:

cd ShareBook
pip install -r requirements.txt
python manage.py runserver

Frontend:

cd sharebooks-design
npm install
npm start

4. Project structure
│   ├── ShareBook -Backend part of site
├── ShareBook
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py -Settings of Django app
│   │   ├── urls.py
│   │   └── wsgi.py   
│   ├── db
│   │   ├── password.txt
│   │   └── password.txt.txt
│   ├── marketplace -Django app for the marketplace functionality
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── media
│   │   ├── books
│   │   │   └── Don_Quixote.jpg
│   │   └── Don_Quixote.jpg
│   ├── myBooks -Django app for user's book collections, including models and API serializers
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── nginx - Contains Nginx configuration files for web server setup
│   │   └── nginx.conf
│   ├── static
│   ├── users - Django app for user authorization and registration
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── signals.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── .dockerignore
│   ├── Dockerfile -Django settings for Docker
│   ├── README.md
│   ├── compose.yaml -Project settings for Docker
│   ├── manage.py
│   └── requirements.txt - Specifies Python package dependencies for the project
├── sharebooks-design -Frontend part of site
│   ├── build -Compiled and ready-to-deploy frontend static files
│   │   ├── static
│   │   │   ├── css
│   │   │   │  
│   │   │   ├── js
│   │   │   │   
│   │   │   └── media
│   │   │      
│   │   ├── asset-manifest.json
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── public -Contains the static files used by the React app before it's built
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src -Source files for the React application, including components and pages
│   │   ├── assets
│   │   │   ├── css
│   │   │   │   ├── Cards.css
│   │   │   │   ├── Filter.css
│   │   │   │   ├── Header.css
│   │   │   │   ├── ModalForm.css
│   │   │   │   ├── ReadingPage.css
│   │   │   │   ├── SearchBar.css
│   │   │   │   ├── login.css
│   │   │   │   └── marketplace.css
│   │   │   ├── fonts
│   │   │   │   └── Baskervville
│   │   │   │       
│   │   │   └── img
│   │   │       
│   │   ├── components
│   │   │   ├── About_us.jsx
│   │   │   ├── Accordion.jsx
│   │   │   ├── Cards.jsx
│   │   │   ├── Cards2.jsx
│   │   │   ├── Contacts.jsx
│   │   │   ├── Filter.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Intro.jsx
│   │   │   ├── ModalForm.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── PopularBooks.jsx
│   │   │   ├── Profil.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── Registration.jsx
│   │   │   ├── Search.jsx
│   │   │   ├── allbooks.jsx
│   │   │   ├── bookItem.jsx
│   │   │   ├── logIn.jsx
│   │   │   ├── recentlyRead.jsx
│   │   │   └── signIn.jsx
│   │   ├── pages
│   │   │   ├── Contacts.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── OurProjects.jsx
│   │   │   ├── PersonalLibrary.jsx
│   │   │   ├── ProfilUser.jsx
│   │   │   ├── PurchasePage.jsx
│   │   │   ├── ReadingPage.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── SuccessPage.jsx
│   │   │   └── marketplace.jsx
│   │   ├── App.css
│   │   ├── App.js -Root React component
│   │   ├── App.test.js
│   │   ├── index.css
│   │   ├── index.js -Entry point for the React application
│   │   ├── logo.svg
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│   ├── .gitignore
│   ├── Dockerfile -Docker settings for React
│   ├── README.md
│   ├── package-lock.json
│   └── package.json
├── README.md
└── docker-compose.yml

