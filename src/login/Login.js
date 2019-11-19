import React from 'react';
import axios from 'axios';

export default class Login extends React.Component  {
    constructor() {
        super();
        this.state={
            login:"",
            senha:""
        };
    }
    async login() {
        const login= encodeURI(this.state.login);
        const senha= encodeURI(this.state.senha);
        let retorno = await 
                    axios.get("/api/usuarios/login/?login="
                    +login+"&senha="+senha);
        let token = retorno.headers.token;
        if(token) {
            this.props.onLogin(retorno.data, token);
        }
    
    } 
    render() {
        return <div>
            login:<input 
                value={this.state.login}
                onChange={
                    (evento)=>this.setState({
                        login:evento.target.value
                    })
                 }
                  />
            <br/><br/>
            senha:<input 
             value={this.state.senha}
             onChange={
                 (evento)=>this.setState({
                    senha:evento.target.value
                 })
              }
             />
            <br/><br/>
            <button 
            onClick={()=>this.login()} 
            >login</button>
        </div>
    } 
}