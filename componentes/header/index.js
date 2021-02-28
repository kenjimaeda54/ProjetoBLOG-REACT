import React from 'react';
import {Link} from 'react-router-dom';
import './header.css';

function Header(){
    return(
        <header id="header">
        <div className="conteudoHeader">
            <Link to="/">Projeto Blog</Link>
            <Link to="/login">Entrar</Link>
        </div>
       </header>
   );
}

export default Header;