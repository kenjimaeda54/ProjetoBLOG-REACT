import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import Firebase          from '../../firebase';
import './registro.css';


class Registro extends Component{
     constructor(props){
         super(props);
             this.state={
             nome:"",   
             email:"",
             senha:"",
         }
      this.cadastrar   = this.cadastrar.bind(this);
      this.onCadastrar = this.onCadastrar.bind(this);
      } 
      
      cadastrar(e){
         this.onCadastrar();
         e.preventDefault();
      }
     
      onCadastrar = async()=>{
         try{
            const{nome,email,senha} = this.state;
            await Firebase.cadastro(nome,email,senha);  
            this.props.history.replace("/admin"); 
        }catch(error){
             alert("Error" +error.message)
         }
      }

     render(){
        return(
           <div>
            <form onSubmit={this.cadastrar} id="registro">
                <h1>Novo usuario</h1>
                <label>Nome</label><br/>
                <input type="text" autoFocus  value={this.state.nome} autoComplete="off" 
                onChange={(evento)=>{this.setState({nome:evento.target.value})}} 
                placeholder="Coloque seu nome"/><br/>
                
                <label>Email</label><br/>
                <input type="text" autoFocus  value={this.state.email} autoComplete="off" 
                onChange={(evento)=>{this.setState({email:evento.target.value})}} 
                placeholder="Coloque seu email.Exemplo:teste@gmail.com"/>
                
                <label>Senha</label><br/>
                <input type="password" autoFocus  value={this.state.senha} autoComplete="off" 
                onChange={(evento)=>{this.setState({senha:evento.target.value})}} 
                placeholder="Coloque sua senha"/><br/>
                <button type="submit" >Cadastrar</button>
            </form>
           </div>
        );
      }
}

export default withRouter(Registro);


