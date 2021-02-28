import React, { Component } from 'react';
import Firebase from './firebase';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import './App.css';
import Home   from "./componentes/home";
import Header from "./componentes/header";
import Login  from "./componentes/login";
import Admin  from "./componentes/admin";

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
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/login" component={Login}/>
                  <Route exact path="/admin" component={Admin}/>
                </Switch>
              </BrowserRouter>
           </div>
           ):(
             <div>
               <h1>Carregando...</h1>
             </div>
           )

       }
  
} 
