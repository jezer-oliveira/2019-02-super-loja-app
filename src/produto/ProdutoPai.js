import React from 'react';
import ProdutoCadastro from './ProdutoCadastro';
import axios from 'axios';
import ProdutoLista from './ProdutoLista';

export default class ProdutoPai extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            produtos:[]
        };
    }    

    async componentDidMount() {
        const resposta=await axios.get("/api/produtos/");
        this.setState({
            produtos:resposta.data
        });
        console.log(resposta);

    }



    async cadastrarUsandoAsync(produto) {
        this.setState({erro:null});
        try {
            const resposta= await axios.post("/api/produtos/",produto);
            console.log(resposta);
        } catch(erro) {
                this.setState({
                    erro:erro
                });
                console.log(erro)

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

    render() {
        console.log(this.state);
        return <div>
            <ProdutoLista itens={this.state.produtos} /> <br/>
            {this.state.erro?<div style={{color:"red"}}>
            {"Erro ao cadastrar:"+this.state.erro.response.data.message}
            </div>:""}
            <ProdutoCadastro 
                onCadastrar={(produto)=>{
                    this.cadastrarUsandoAsync(produto)
                }}
             />
        </div>
    }
}