import React from 'react';

export default class ProdutoCadastro  extends React.Component {
    constructor(props) {
        super(props);
        this.state={
                nome:"",
                valor:""
                };
    }

    confirmar() {
        const produto={
            nome:this.state.nome,
            valor:this.state.valor
            };
        this.props.onCadastrar(produto);
    }

    render() { 
        console.log(this.state);
        return <div>
            <label>id:</label> <br/><br/>
            <label>Nome:</label><input 
                    value={this.state.nome}
                    onChange={
                        (event) =>this.setState({
                            nome:event.target.value
                        })
                       } /> <br/><br/>
            <label>Valor:</label><input 
                    value={this.state.valor}
                    onChange={
                        (event) => this.setState({
                            valor:event.target.value
                        })
                    }
                 /> <br/><br/>
            <button onClick={()=>this.confirmar()} >Cadastrar</button>
            <button style={{marginLeft:"15px"}}>Limpar</button>
        </div>
    }
}