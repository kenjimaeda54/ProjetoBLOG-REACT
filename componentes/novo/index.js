import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import Firebase          from '../../firebase';
import './novo.css';

class Novo extends Component{
      constructor(props){
         super(props);
         this.state={
            titulo:'',
            imagem:'',
            descricao:'',
            alert:""
         }
       this.cadastrar = this.cadastrar.bind(this);    
    }
    async componentDidMount(){
        if(!Firebase.getCurrent()){
        this.props.history.replace('/');
        return null;
      }
   }

   cadastrar = async(e)=>  {
    const{titulo,imagem,descricao}=this.state; 
    if(titulo==="" && imagem==="" && descricao==="" ){
          this.setState({alert:"Preencha todos os dados"});
     }else{
          let novoPost = Firebase.app.ref('posts');
          let chave    = novoPost.push().key;
          await novoPost.child(chave).set({
               autor:  localStorage.nome,
               titulo: this.state.titulo,
               imagem: this.state.imagem,
               descricao: this.state.descricao,
          }).then(
            this.props.history.push("/admin")   
          )
        }
    
     e.preventDefault(); 
   } 
   
     
     render(){
          return(
              <div id="novo">
               <header>
                   <Link to="/admin">Voltar</Link>
               </header>
                <form onSubmit={this.cadastrar} id="admin">
                  <span>{this.state.alert}</span>
                  <label>Titulo</label><br/>
                  <input type="text" autoFocus autoComplete="off" 
                  value={this.state.titulo} placeholder="Coloque o tiutlo do post" 
                  onChange={(e)=>{this.setState({titulo:e.target.value})}} /><br/>
                  
                  <label>Imagem</label><br/>
                  <input type="text"  autoComplete="off" 
                  value={this.state.imagem} placeholder="Coloque o link da imagem"
                  onChange={(e)=>{this.setState({imagem:e.target.value})}}/><br/>

                    
                  <label>Descrição</label><br/>
                  <textarea type="text"  autoComplete="off" 
                  value={this.state.descricao} placeholder="Coloque alguma descrição"
                  onChange={(e)=>{this.setState({descricao:e.target.value})}}/><br/>

                <button type="submit">Cadastrar</button> 
                </form>
              </div>
          );
      }
}
export default withRouter(Novo);