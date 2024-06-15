import React from 'react';
import { SearchProvider } from './context/searchContext';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResponsiveMenu from './components/MobileHeader.jsx';
import AppFooter from './components/Footer';
import HomePage from './pages/HomePage';
import ContactsPage from './pages/Contacts';
import FAQPage from './pages/FAQ';
import SuccessPage from './pages/SuccessPage';
import LogIn from './components/logIn';
import Marketplace from './pages/marketplace.jsx';
import Registration from './components/Registration.jsx';
import ProfilUser from './pages/ProfilUser.jsx';
import PersonalLibrary from './pages/PersonalLibrary.jsx';
import Settings from './pages/Settings.jsx';
import BookReadingPage from './pages/ReadingPage.jsx';
import PurchasePage from './pages/PurchasePage.jsx';
import OurProjectPage from './pages/OurProjects.jsx';
import ResetPasswordForm from './pages/ResetPasswordPage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import WishPage from './pages/WishPage.jsx';
import SearchResultsPage from './pages/SearchResultPage.jsx';

//Используем react-router-dom для маршрутизации одностраничного приложения React(SPA)
//BrowserRouter — оболочка вокруг приложения, которая использует HTML5 history API для синхронизации UI с URL.
//Route — компонент, который отображает UI, если его путь совпадает с текущим URL.
function App() {
  
  return (
    <BrowserRouter>
    <SearchProvider> {/* Контекст поиска книги по названию */}
     <div className="App">
        <ResponsiveMenu /> {/* Header */}
      <div className="content-with-fixed-header">
      <Routes>
      <Route index element={<HomePage />}></Route> {/* Главная страница */}
        
        <Route path="search-results/" element={<SearchResultsPage />} /> {/* Страница результатов поиска */}
        <Route path='contacts/' element={<ContactsPage/>}></Route> {/* Страница контактов */}
        <Route path='OurProjects/' element={<OurProjectPage/>}></Route> {/*  Страница наших проектов */}
        <Route path='FAQ/' element={<FAQPage/>}> </Route> {/* Страница часто задаваемых вопросов */}
        <Route path='login/' element={<LogIn/>}></Route> {/*  Страница входа */}
        <Route path='Registration/' element={<Registration/>}></Route> {/* Страница регистрации */}
        <Route path='SuccessPage/' element={<SuccessPage/>}></Route> {/* Страница успешной операции */}
        <Route path='ProfilUser/' element={<ProfilUser/>}></Route> {/* Страница профиля пользователя */}
        <Route path='PersonalLibrary/' element={<PersonalLibrary/>}></Route> {/* Личная библиотека пользователя */}
        <Route path='Marketplace/' element={<Marketplace/>}></Route> {/* Страница Наши Книги */}
        <Route path='Settings/' element={<Settings/>}></Route> {/* Страница настроек */}
        <Route path='Reading/' element={<BookReadingPage/>}></Route> {/* Страница чтения книги */}
        <Route path='Purchase/' element={<PurchasePage/>}></Route> {/* Страница аренды книги */}
        <Route path='Reset_password/' element={<ResetPasswordForm/>}></Route> {/* Страница сброса пароля */}
        <Route path='PaymentPage/' element={<PaymentPage/>}></Route> {/* Страница оплаты - Просто пример */}
        <Route path='WishPage/' element={<WishPage/>}></Route> {/* Страница  списка желаемых книг */}
        
      </Routes>
      </div>
      <AppFooter /> {/* Footer */}
      </div>
      </SearchProvider>
    </BrowserRouter>
  );
}

export default App;

