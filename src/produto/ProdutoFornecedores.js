import React from 'react';
import axios from 'axios';

export default class ProdutoFornecedores extends React.Component {
    constructor(){
        super();
        this.state={
            lista:[]
        };
    }
    async componentDidMount() {
       this.atualizarLista();
       this.atualizarListaProdutoFornecedores();
    }

    async atualizarLista() {
        const resposta=await axios.get(
            "/api/fornecedores/");
        this.setState({
            fornecedores:resposta.data
        });
    }

   async pesquisa(texto) {
        const resposta=await axios.get(
            "/api/fornecedores/pesquisar/nome/inicia/"+texto);
        this.setState({
            fornecedores:resposta.data
        });

    }

    async atualizarListaProdutoFornecedores() {
        const resposta=await axios.get(
            "/api/produtos/"
            +this.props.produto.id
            +"/fornecedores/");
        this.setState({
            fornecedoresProdutos:resposta.data
        });
    }

    async adicionarFornecedor(fornecedor) {
        await axios.post(
            "/api/produtos/"
            +this.props.produto.id
            +"/fornecedores/",
            fornecedor
        );
        this.atualizarListaProdutoFornecedores();
    }

    render() {
        return <div>
            <ul>
            {this.state.fornecedoresProdutos&&
            this.state.fornecedoresProdutos.map(
                (item) => <li>{item.nome}</li>
            )
            }
            </ul>
            Adicionar:
            <input value={this.state.pesquisa} 
            onChange={(evento)=>this.pesquisa(evento.target.value)} />
            <ul>
            {this.state.fornecedores&&
            this.state.fornecedores.map(
                (item) => <li>{item.nome}
                    <button onClick={
                        () => this.adicionarFornecedor(item)
                        }>adicionar</button>
                </li>
            )
            }
            </ul>


        </div>
    }

}