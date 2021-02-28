import React,{Component} from 'react';
import Firebase from '../../firebase';
import './index.css';


class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            lista:[]
        }
    
    }
    
    componentDidMount(){
       Firebase.app.ref('posts').once('value').then((snapshot)=>{
           let estado = this.state;
           estado.lista = [];

           snapshot.forEach((filhoItem)=>{
              estado.lista.push({
                id:        filhoItem.key,
                titulo:    filhoItem.val().titulo,
                autor:     filhoItem.val().autor,
                imagem:    filhoItem.val().imagem,
                descricao: filhoItem.val().descricao
              })
           }) 
           this.setState(estado);
        })
    }


    render(){
        return(
         <section id="post">
             {this.state.lista.map((item)=>{
                return(
                  <article key={item.id}>
                    <header>
                        <div>
                          <strong className="titulo">{item.titulo}</strong>
                          <span  className="subtitulo">Autor: {item.autor}</span>
                        </div>
                    </header>
                    <img src={item.imagem} alt="capa do post"/>
                    <footer>
                        <p>{item.descricao}</p>
                    </footer>
                   </article>  
                ); 
             })}
         </section>
        );
    }
}

export default Home;