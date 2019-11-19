import React from 'react';
import './App.css';
import ProdutoPai from './produto/ProdutoPai';
import Login from './login/Login';
import axios from 'axios';

export default class App extends React.Component  {
  constructor() {
    super();
    this.state={logado:false};
  }

  async componentDidMount() {
    const token= localStorage.getItem("token");
    if(token) {
      const retorno = await axios.get("/api/usuarios/token/?token="+token);
      if(retorno.data) {
      axios.defaults.headers.common['token']=token;
      this.setState({
        logado:true,
        usuario:retorno.data
      });
    }
  }

  }

  login(usuario, token) {
    axios.defaults.headers.common['token']=token;
    localStorage.setItem("token",token);
    this.setState({
      logado:true,
      usuario:usuario
    });
  }

  render() {
  return (
    <div>
      {this.state.logado?<ProdutoPai />:
      <Login onLogin={(usuario, token)=>this.login(usuario, token)} />}
    </div>
  );
}
}

