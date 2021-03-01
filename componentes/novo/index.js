import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import Firebase          from '../../firebase';
import './novo.css';

class Novo extends Component{
      constructor(props){
         super(props);
         this.state={
            titulo:'',
            imagem:null,
            url:'',
            descricao:'',
            alert:"",
            erroImagem:"",
            progress:0,
         }
       this.cadastrar     = this.cadastrar.bind(this);  
       this.colocaImagem  = this.colocaImagem.bind(this);
       this.carregaImagem = this.carregaImagem.bind(this);

    }
     componentDidMount(){
        if(!Firebase.getCurrent()){
        this.props.history.replace('/');
        return null;
      }
   }

   cadastrar = async(e)=>  {
    const{titulo,imagem,descricao,url}=this.state; 
    if(titulo===""    || 
       imagem===""    || 
       descricao==="" ||
       url      ==="" ||
       imagem  === null  
       ){
          this.setState({alert:"Preencha todos os dados"});
     }else{
          let novoPost = Firebase.app.ref('posts');
          let chave    = novoPost.push().key;
          await novoPost.child(chave).set({
               autor:  localStorage.nome,
               titulo: this.state.titulo,
               imagem: this.state.url,
               descricao: this.state.descricao,
          }).then(
            this.props.history.push("/admin"),  
            this.setState({alert:""}), 
          )
        }
    
     e.preventDefault(); 
   } 
   
   colocaImagem= async(e)=>{
      if(e.target.files[0]){
         const image = e.target.files[0];
        
         if(image.type  === 'image/png' || image.type === 'image/jpeg'){
         await this.setState({imagem: image,erroImagem:""});
               this.carregaImagem();
         } else{
           this.setState({imagem:null,erroImagem:"Coloque uma imagem  no formato JPG ou PNG"});
           return null;
         }   
        }  
      }
    carregaImagem = async()=>{
        const{imagem} = this.state;
        const usuarioId = Firebase.getCurrentUid();

        const imagemOk = Firebase.storage
        .ref(`imagens/${usuarioId}/${imagem.name}`)
        .put(imagem);

        await imagemOk.on('state_changed',
        (snapshot)=>{
           //progresso
           const progress  = Math.round(
             (snapshot.bytesTransferred / snapshot.totalBytes)*100
           )
           this.setState({progress:progress});
        },
        // erro
        (error)=>{
             console.log('Erro na imagem ' +error);
         }, 
         ()=>{
           //sucesso
            Firebase.storage.ref(`imagens/${usuarioId}`)
           .child(imagem.name).getDownloadURL()
           .then(url=>{
             this.setState({url:url});  
           })
         }) 
                                                
    }  
     
     render(){
          return(
              <div id="novo">
               <header>
                   <Link to="/admin">Voltar</Link>
               </header>
                <form onSubmit={this.cadastrar} id="admin">
                 <span> {this.state.erroImagem}</span>
                  <span>{this.state.alert}</span>
                  <label>Imagem</label><br/>
                  <input type="file"
                  onChange={this.colocaImagem}/>
                  <br/>
                  {this.state.url !== '' ?
                  <img src={this.state.url} width="250" height="150" alt="capa da imagem"/> 
                   :
                  <progress value={this.state.progress} max="100" />   
                   }


                  <label>Titulo</label><br/>
                  <input type="text" autoFocus autoComplete="off" 
                  value={this.state.titulo} placeholder="Coloque o tiutlo do post" 
                  onChange={(e)=>{this.setState({titulo:e.target.value})}} /><br/>
                    
                  <label>Descrição</label><br/>
                  <textarea type="text"  autoComplete="off" 
                  value={this.state.descricao} placeholder="Coloque alguma descrição"
                  onChange={(e)=>{this.setState({descricao:e.target.value})}}/><br/>

                <button type="submit">Postar</button> 
                </form>
              </div>
          );
      }
}
export default withRouter(Novo);