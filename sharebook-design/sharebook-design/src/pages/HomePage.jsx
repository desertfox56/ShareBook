import React from 'react';
import Intro from '../components/Intro.jsx';
import About_us from '../components/About_us.jsx';
import '../assets/css/HomePage.css';

function HomePage(){
    return(
        <div className="Home">
            
            <Intro/>
            <About_us/>
            
        </div>
    );
}
export default HomePage;