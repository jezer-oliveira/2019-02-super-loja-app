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
                        (item) =><tr>
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
                            <td>{item.valor}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    }

}