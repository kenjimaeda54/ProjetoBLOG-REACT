import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import Firebase          from '../../firebase';
import './login.css'

class Login extends Component{
     constructor(props){
         super(props);
             this.state={
             email:"",
             senha:""
         }
      this.logar = this.logar.bind(this);
      this.login = this.login.bind(this);
      } 


     componentDidMount(){
        if(Firebase.getCurrent()){
           return this.props.history.replace('admin');
        }
     } 
     
     
     logar(e){
      this.login(); 
      e.preventDefault();
     } 
     
     login = async() =>{
      try{
       await Firebase.login(this.state.email,this.state.senha)
        .catch((error)=>{
          if(error==='auth/user-not-found'){
             alert("Usuario não encontrado");
          }else{
            alert("Error:" +error.code);
            return null;
          }
       });
       this.props.history.replace('/admin');
      }catch(error){
         alert(error.message);
      }
    }
        
     render(){
        return(
           <div>
              <form onSubmit={this.logar} id="login"> 
              <label>Email</label><br/>   
              <input type="text" autoComplete="off" autoFocus value={this.state.email} 
              placeholder="Seu email:exemplo@gmail.com"
              onChange={(evento)=>{this.setState({email:evento.target.value})}}
              /><br/> 
              
              <label>Senha</label><br/>   
              <input type="password" autoComplete="off" value={this.state.senha} 
               placeholder="Sua senha:"
               onChange={(evento)=>{this.setState({senha:evento.target.value})}}
              /><br/> 
              
              <button type="submit">Login</button>
              <Link to="/registro">Ainda não tem cadastro?</Link>  
              </form>
           </div>
        );
      }
}

export default withRouter(Login);