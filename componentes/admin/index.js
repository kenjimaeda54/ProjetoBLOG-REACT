import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import Firebase          from '../../firebase';
import './admin.css';

class Admin extends Component{
      constructor(props){
         super(props);
         this.state={
            nome:localStorage.nome,
            email:"",
         }
        this.deslogar=this.deslogar.bind(this);
     }
     
    async componentDidMount(){
          if(!Firebase.getCurrent()){
          this.props.history.replace('/login');
          return null;
        }else{   
            Firebase.getUser((info)=>{
            localStorage.nome = info.val().nome;
            this.setState({nome:localStorage.nome});
          })  
        }      
     }
   
     deslogar = async() =>{
        await Firebase.deslogar()
              .catch((error)=>{
                  console.log(error);
              }) 
        localStorage.removeItem("nome");
        this.props.history.push("/");    
     }
     
     render(){
          return(
              <div id="admin">
                <div className="paragrafo">
                    <h1>{this.state.nome}</h1>
                    <h3>Email:{Firebase.getCurrent(this.state.email)}</h3>
                <div>   
                    <Link to="/admin/novo">Novo Post</Link>
                    <button onClick={()=>{this.deslogar()}}>Deslogar</button>
                </div> 
                </div>
              </div>
          );
      }
}
export default withRouter (Admin);