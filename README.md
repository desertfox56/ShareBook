# ShareBook
ShareBook is an online library platform that allows users to share books with one another.


## Stack
| Component       | Technology       |
| :---:           | :---:            |
| Backend         | Django (Python)  |
| Frontend        | React.js         |
| Database        | PostgreSQL       |
| Containerization| Docker           |
| Web-Server      | Nginx            |
| Version Control | Git & GitHub     |


<br />

# Getting Started

## Cloning a repository

```bash
git clone https://github.com/desertfox56/ShareBooks.git
```

<br />


## Running using Docker

```bash
docker-compose up --build
```

This command will build and run all the necessary containers (Django, React, PostgreSQL).



<br />

## Running without Docker


### Backend

```
cd ShareBook
```

```
pip install -r requirements.txt
```

```
python manage.py runserver
```


### Frontend

```
cd sharebook-design/sharebook-design
```

```
npm install
```

```
npm start
```



<br />


<details>
<summary><h2>Project Structure</h2></summary>

```
ShareBook/
├── ShareBook/ # Backend part of site
│ ├── init.py
│ ├── asgi.py
│ ├── settings.py # Settings of Django app
| ├── celery.py 
│ ├── urls.py
│ └── wsgi.py
├── marketplace/ # Django app for the marketplace functionality
│ ├── init.py
│ ├── admin.py
│ ├── apps.py
│ ├── models.py
│ ├── tests.py
│ ├── urls.py
│ └── views.py
├── media/
│ ├── books/
│ 
├── myBooks/ # Django app for user's book collections, including models and API serializers
│ ├── init.py
│ ├── admin.py
│ ├── apps.py
│ ├── models.py
│ ├── serializers.py
│ ├── tests.py
| ├── tasks.py
│ ├── urls.py
│ └── views.py
├── nginx/ # Contains Nginx configuration files for web server setup
│ └── nginx.conf
├── static/
├── users/ # Django app for user authorization and registration
│ ├── init.py
│ ├── admin.py
│ ├── apps.py
│ ├── models.py
│ ├── serializers.py
│ ├── signals.py
│ ├── tests.py
│ ├── urls.py
│ └── views.py
├── .dockerignore
├── Dockerfile # Django settings for Docker
├── README.md
├── docker-compose.yaml # Project settings for Docker
├── manage.py
└── requirements.txt # Specifies Python package dependencies for the project
├── sharebook-design
│   └── sharebook-design
│       ├── public
│       │   ├── favicon.ico
│       │   ├── index.html
│       │   ├── logo192.png
│       │   ├── logo512.png
│       │   ├── manifest.json
│       │   ├── pdf.worker.mjs
│       │   └── robots.txt
│       ├── src
│       │   ├── assets
│       │   │   ├── css
│       │   │   │   ├── Cards.css
│       │   │   │   ├── Contacts.css
│       │   │   │   ├── FAQ.css
│       │   │   │   ├── Filter.css
│       │   │   │   ├── Footer.css
│       │   │   │   ├── Header.css
│       │   │   │   ├── HomePage.css
│       │   │   │   ├── ModalForm.css
│       │   │   │   ├── OurProjectPage.css
│       │   │   │   ├── PaymentForm.css
│       │   │   │   ├── PersonalLibrary.css
│       │   │   │   ├── ReadingPage.css
│       │   │   │   ├── ResetPassword.css
│       │   │   │   ├── SearchBar.css
│       │   │   │   ├── SuccessPage.css
│       │   │   │   ├── UserAgreement.css
│       │   │   │   ├── login.css
│       │   │   │   └── marketplace.css
│       │   │   ├── fonts
│       │   │   │   └── Baskervville
│       │   │   │       ├── Baskervville-Italic.ttf
│       │   │   │       ├── Baskervville-Regular.ttf
│       │   │   │       ├── COPYRIGHT.txt
│       │   │   │       ├── LICENSE.txt
│       │   │   │       └── README.txt
│       │   │   └── img
│       │   ├── components
│       │   │   ├── About_us.jsx
│       │   │   ├── Accordion.jsx
│       │   │   ├── Cards.jsx
│       │   │   ├── Cards2.jsx
│       │   │   ├── Contacts.jsx
│       │   │   ├── Filter.jsx
│       │   │   ├── Footer.jsx
│       │   │   ├── Header.jsx
│       │   │   ├── Intro.jsx
│       │   │   ├── MobileHeader.jsx
│       │   │   ├── ModalFormPurchase.jsx
│       │   │   ├── ModalFormTransfer.jsx
│       │   │   ├── Pagination.jsx
│       │   │   ├── PopularBooks.jsx
│       │   │   ├── Profil.jsx
│       │   │   ├── ProgressBar.jsx
│       │   │   ├── Project.jsx
│       │   │   ├── Registration.jsx
│       │   │   ├── RenderPDF.jsx
│       │   │   ├── ResultSearchBooks.jsx
│       │   │   ├── Search.jsx
│       │   │   ├── UserAgreement.jsx
│       │   │   ├── WishCards.jsx
│       │   │   ├── allbooks.jsx
│       │   │   ├── bookItem.jsx
│       │   │   ├── logIn.jsx
│       │   │   └── recentlyRead.jsx
│       │   ├── context
│       │   │   ├── FiltersContext.js
│       │   │   └── searchContext.js
│       │   ├── pages
│       │   │   ├── Contacts.jsx
│       │   │   ├── FAQ.jsx
│       │   │   ├── HomePage.jsx
│       │   │   ├── OurProjects.jsx
│       │   │   ├── PaymentPage.jsx
│       │   │   ├── PersonalLibrary.jsx
│       │   │   ├── ProfilUser.jsx
│       │   │   ├── PurchasePage.jsx
│       │   │   ├── ReadingPage.jsx
│       │   │   ├── ResetPasswordPage.jsx
│       │   │   ├── SearchResultPage.jsx
│       │   │   ├── Settings.jsx
│       │   │   ├── SuccessPage.jsx
│       │   │   ├── WishPage.jsx
│       │   │   └── marketplace.jsx
│       │   ├── App.css
│       │   ├── App.js
│       │   ├── App.test.js
│       │   ├── index.css
│       │   ├── index.js
│       │   ├── logo.svg
│       │   ├── reportWebVitals.js
│       │   └── setupTests.js
│       ├── .env
│       ├── .gitignore
│       ├── README.md
│       ├── package-lock.json
│       └── package.json
├── README.md
└── docker-compose.yml
```
  
</details>

