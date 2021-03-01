import React, { Component } from "react";
import './footer.css';

function Footer(){
     return(
        <Sobre  desenvolvedor="Ricardo kenji Vivas Maeda" 
        midia1="https://github.com/kenjimaeda54/ProjetoBLOG-REACT"  
        midia2="https://www.linkedin.com/in/kenjimaeda1233/"/> 
     )
}

class Sobre extends Component{ 
    render(){
    return(
      <footer id="footer">
      <div className="corpo">
              <h3>Nome do desenvolvedor:{this.props.desenvolvedor}</h3>   
              <a href={this.props.midia1}>Git hub</a>
              <a href={this.props.midia2}>Linkedin</a>
      </div>
      </footer>
    );
 }
}
export default Footer;