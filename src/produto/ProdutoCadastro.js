import React from 'react';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from "@material-ui/core/Button";
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default class ProdutoCadastro  extends React.Component {
    constructor(props) {
        super(props);
        if(this.props.itemEditar) { 
            this.state=this.props.itemEditar;
            if(this.props.itemEditar.genero)
                this.state.generoId=this.props.itemEditar.genero.id;
            if(this.props.itemEditar.embalagem) {
                this.state.idEmbalagem=this.props.itemEditar.embalagem.id;
                this.state.codigoBarra=this.props.itemEditar.embalagem.codigoBarra;
                this.state.peso=this.props.itemEditar.embalagem.peso;
                } 
                else {
                    this.state.codigoBarra="";
                    this.state.peso="";
                }
        }  else {
                this.state=this.estadoInicial();
            }

    }
    estadoInicial() {
        return {
            nome:"",
            valor:"",
            peso:"",
            codigoBarra:"",
            genero:""
        }
    }
    async confirmar() {
        let embalagem=null;
        if(this.state.peso||this.state.codigoBarra) {
            embalagem={
                id:this.state.idEmbalagem,
                peso:this.state.peso,
                codigoBarra:this.state.codigoBarra
            };
        }
        const produto={
            nome:this.state.nome,
            valor:this.state.valor,
            genero:this.state.generoId?{id:this.state.generoId}:null,
            embalagem:embalagem
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
            this.setState(this.estadoInicial());
        }
    }
    
    cancelar() {
        if(this.state.id) {
            this.props.onCancelar();
        } else {
            this.setState(this.estadoInicial());
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
            <TextField 
                    label="Nome"
                    value={this.state.nome}
                    onChange={
                        (event) =>this.setState({
                            nome:event.target.value
                        })
                       } /> <br/><br/>
            
            <TextField
                    label="Valor"
                    type="number"
                    value={this.state.valor}
                    onChange={
                        (event) => this.setState({
                            valor:event.target.value
                        })
                    }
                 /> <br/><br/>

        <Select
          value={this.state.generoId}
          onChange={(evento)=>this.setState({
              generoId:evento.target.value
          }) }
            >
            <MenuItem key={""} value={""}></MenuItem>
            {this.props.generos&&this.props.generos.map(
                (genero) => <MenuItem key={genero.id} value={genero.id}>{genero.nome}</MenuItem>
            )}
        </Select>
<br/><br/>
            <TextField
                    label="Código de Barra"
                    type="number"
                    value={this.state.codigoBarra}
                    onChange={
                        (event) => this.setState({
                            codigoBarra:event.target.value
                        })
                    }
                 /> <br/><br/>

                <TextField
                    label="Peso"
                    type="number"
                    value={this.state.peso}
                    onChange={
                        (event) => this.setState({
                            peso:event.target.value
                        })
                    }
                 /> <br/><br/>
        <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={()=>this.confirmar()}
            >
            {this.state.id?"Atualizar":"Cadastrar"}
            </Button>

            <Button
                variant="contained"
                color="secondary"
                startIcon={<CancelPresentationIcon />}
                onClick={()=>this.cancelar()}
            >
            {this.state.id?"Cancelar":"Limpar"}
            </Button>
        </div>
    }
}