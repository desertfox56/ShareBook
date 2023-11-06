import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppHeader from './components/Header.jsx';
import AppFooter from './components/Footer';
import HomePage from './pages/HomePage';
import ContactsPage from './pages/Contacts';
import FAQPage from './pages/FAQ';
import SuccessPage from './pages/SuccessPage';
import LogIn from './components/logIn';
import Marketplace from './pages/marketplace.jsx';
function App() {
  return (
    <BrowserRouter>
     <div className="App">
        <AppHeader />
      <div className="content-with-fixed-header">
      <Routes>
      <Route index element={<HomePage />}> 
        {/* <Route path="/about" element={<AboutPage />} /> */}
       </Route>
        {/* <Route path="/" element={<AppHeader />} /> */}
        {/* другие маршруты */}
        <Route path='contacts/' element={<ContactsPage/>}>

        </Route>

        <Route path='FAQ/' element={<FAQPage/>}> </Route>
        <Route path='login/' element={<LogIn/>}></Route>
        <Route path='SuccessPage/' element={<SuccessPage/>}></Route>
        <Route path='Marketplace/' element={<Marketplace/>}></Route>
      </Routes>
      </div>
      <AppFooter />
      </div>
    </BrowserRouter>
  );
}


export default App;

