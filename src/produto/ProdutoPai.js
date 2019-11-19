import React from 'react';
import ProdutoCadastro from './ProdutoCadastro';
import axios from 'axios';
import ProdutoLista from './ProdutoLista';
import ProdutoFornecedores from './ProdutoFornecedores';

export default class ProdutoPai extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            produtos:[]
        };
    }    

    async componentDidMount() {
        this.atualizarLista();
        const listaGeneros = await axios.get("/api/generos/");
        this.setState({
            generos:listaGeneros.data
        });


    }

    editar(item) {
        this.setState({
            itemEditar:item
        });
    }

    async confirmarEdicao(item) {
        this.setState({erro:null});
        try {
            await axios.put("/api/produtos/"+item.id,item);
            await this.atualizarLista();
            this.setState({itemEditar:null});
            return true;
        } catch(erro) {
                this.setState({
                    erro:erro
                });

                return false;

        }
    }

    async excluir(id) {
        await axios.delete("/api/produtos/"+id);
        this.atualizarLista();
    }

    async atualizarLista() {
        const resposta=await axios.get("/api/produtos/");
        this.setState({
            produtos:resposta.data
        });
    }

    async cadastrarUsandoAsync(produto) {
        this.setState({erro:null});
        try {
            await axios.post("/api/produtos/",produto);
            await this.atualizarLista();
            return true;
        } catch(erro) {
                this.setState({
                    erro:erro
                });

                return false;

        }
        
    }

    cadastrarNormal(produto) {
        this.setState({erro:null});
        axios.post("/api/produtos/",produto).then(
            (resposta) =>console.log(resposta)
        ).catch(
            (erro) => {
                this.setState({
                    erro:erro
                });
                console.log(erro)
            }
         );

        
    }
    editarFornecedores(produto) {
        this.setState({
            produtoEditarFornecedor:produto
        });
    }

    render() {
        console.log(this.state);
        return <div>
            <ProdutoLista 
            itens={this.state.produtos}
            onExcluir={(id)=>this.excluir(id)}
            onEditar={(item)=>this.editar(item)}
            onEditarFornecedores={(item)=>this.editarFornecedores(item)}
            
            /> <br/>
            {this.state.erro?<div style={{color:"red"}}>
            {"Erro ao cadastrar:"+this.state.erro.response.data.message}
            </div>:""}

            {this.state.produtoEditarFornecedor?
            <ProdutoFornecedores
                key={this.state.produtoEditarFornecedor.id}
                produto={this.state.produtoEditarFornecedor}  />:
            <ProdutoCadastro 
            generos={this.state.generos}
            key={this.state.itemEditar?this.state.itemEditar.id:"novo"}
            itemEditar={this.state.itemEditar}
            onCadastrar={(produto)=>{
                return this.cadastrarUsandoAsync(produto);
            }}

            onEditar={(item)=>this.confirmarEdicao(item)}
            onCancelar={()=>this.setState({itemEditar:null})}
            
         />}
        </div>
    }
}