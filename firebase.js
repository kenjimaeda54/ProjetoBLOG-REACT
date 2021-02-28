import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


let firebaseConfig = {
    apiKey: "AIzaSyAhMDu2fkhx607Y-4aFfX7mrf9iJ81I00M",
    authDomain: "reactudemy-24d1f.firebaseapp.com",
    databaseURL: "https://reactudemy-24d1f-default-rtdb.firebaseio.com",
    projectId: "reactudemy-24d1f",
    storageBucket: "reactudemy-24d1f.appspot.com",
    messagingSenderId: "768025376357",
    appId: "1:768025376357:web:99c5c87fe90cdd99abf88c"
  };

class Firebase{
    constructor(){
  if (!app.apps.length) {      
    app.initializeApp(firebaseConfig);
  }   
  //aqui acesso a database direto
  this.app = app.database();
}
 login(email,senha){
   return app.auth().signInWithEmailAndPassword(email,senha);
  }

  deslogar(){
    return app.auth().signOut();
  } 

  async cadastro(nome,senha,email){
  await app.auth().createUserWithEmailAndPassword(senha,email)
   
  const id = app.auth().currentUser.uid;
  return app.database().ref('Usuarios').child(id).set({
    nome: nome,
  }) 
  }   
  
  isInitialized(){
     return new Promise((resolve)=>{
          app.auth().onAuthStateChanged(resolve);
     })  
  } 
  getCurrent(){
    return app.auth().currentUser && app.auth().currentUser.email;
  }
  
  async  getUser(callback){
    //!singifica que negativo ou seja aqui estou verificando primeiro se não tem nada
    if(!app.auth().currentUser){
    return null;
  }
    const id = app.auth().currentUser.uid;
    await app.database().ref('Usuarios').child(id)
    .once('value').then(callback); 
 }
}

export default new Firebase();