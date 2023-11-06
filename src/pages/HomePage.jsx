import React from 'react';
import Intro from '../components/Intro.jsx';
import AppHeader from '../components/Header.jsx';
import AppFooter from '../components/Footer.jsx';
import About_us from '../components/About_us.jsx';
function HomePage(){
    return(
        <div className="Home">
            
            <Intro/>
            <About_us/>
            
        </div>
    );
}
export default HomePage;