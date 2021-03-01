import React, { Component } from 'react';
import Firebase from './firebase';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import './App.css';
import Home     from "./componentes/home";
import Header   from "./componentes/header";
import Login    from "./componentes/login";
import Admin    from "./componentes/admin";
import Registro from "./componentes/registro";
import Novo     from "./componentes/novo";
import Footer   from "./componentes/footer";

export default class App extends Component{
 
       state = {
         firebaseInitialized:false,
       }
        
       componentDidMount(){
          Firebase.isInitialized().then((resultado)=>{
            this.setState({firebaseInitialized:true})
          }) 
       }

        render(){
          return this.state.firebaseInitialized===true?(
           <div>
              <BrowserRouter>
                <Header/>
                <Switch>
                  <Route exact path="/"           component={Home}/>
                  <Route exact path="/login"      component={Login}/>
                  <Route exact path="/admin"      component={Admin}/>
                  <Route exact path="/registro"   component={Registro}/>
                  <Route exact path="/admin/novo" component={Novo}/>
                </Switch>
                <Footer/>
              </BrowserRouter>
           </div>
           ):(
             <div>
               <h1>Carregando...</h1>
             </div>
           )

       }
  
} 
