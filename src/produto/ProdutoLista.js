import React from 'react';

export default class ProdutoLista extends React.Component {

    

    render(){
        return <div>
            <table border='1'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Nome</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>{
                    this.props.itens.map(
                        (item) =><tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
                            <td>{item.valor}</td>
                            <td>
                                <button onClick={()=>this.props.onEditar(item)} >Editar</button>
                                <button onClick={()=>this.props.onExcluir(item.id)}>Excluir</button>
                                <button onClick={()=>this.props.onEditarFornecedores(item)} >Fornecedores</button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    }

}