import React from 'react';

export default class ProdutoCadastro  extends React.Component {
    constructor(props) {
        super(props);
        if(this.props.itemEditar) { 
            this.state=this.props.itemEditar;
        }  else {
                this.state={
                        nome:"",
                        valor:""
                        };
            }

    }

    async confirmar() {
        const produto={
            nome:this.state.nome,
            valor:this.state.valor
            };
        let ret;
        if(this.props.itemEditar) {
            produto.id=this.props.itemEditar.id;
            ret= await this.props.onEditar(produto);    
        }
        else {
            ret= await this.props.onCadastrar(produto);
        }
        console.log(ret);
        if(ret) {
            this.setState({
                nome:"",
                valor:""
            });
        }
    }
    
    cancelar() {
        if(this.state.id) {
            this.props.onCancelar();
        } else {
            this.setState({
                nome:"",
                valor:""
            });
        }
    }

    render() { 
        console.log(this.state);
        return <div>
            {this.state.id?
                <div>
                 <label>id:</label>{this.state.id}  <br/><br/>
                </div>:""
            }
            <label>Nome:</label>
            <input 
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
            <button onClick={()=>this.confirmar()} >
                {this.state.id?"Atualizar":"Cadastrar"}
                </button>
            <button 
                onClick={()=>this.cancelar()}
            style={{marginLeft:"15px"}}>
                    {this.state.id?"Cancelar":"Limpar"}
                </button>
        </div>
    }
}