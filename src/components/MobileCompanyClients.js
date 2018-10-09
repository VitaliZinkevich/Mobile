import React from 'react';
import PropTypes from 'prop-types';

import {deleteClient, editClient} from '../events'

class MobileCompanyClients extends React.PureComponent {

static propTypes = {
        id: PropTypes.number.isRequired,
        FIO:PropTypes.shape({
          lastName: PropTypes.string.isRequired,
          firstName: PropTypes.string.isRequired,
          fatherName: PropTypes.string.isRequired,
        }),
        balance: PropTypes.number.isRequired,
      };
    
      state = {
        FIO: this.props.FIO,
        balance: this.props.balance,
};

delete=(id)=>{
    if (window.confirm(`Действительно удалить клиента с ай ди ${id}`) === true) {
        deleteClient.emit('deleteClient', id)
    }
    
}

edit =(id)=>{
  editClient.emit ('editClient', id)
}

  render() {
    console.log (`render CLIENT ${this.props.id}`)
    return (
      <tr className='w-100'>
      <td>{this.state.FIO.lastName}</td>
      <td>{this.state.FIO.firstName}</td>
      <td>{this.state.FIO.fatherName}</td>

      <td>{this.state.balance}</td>
        {this.state.balance > 0 ? 
        <td className='bg-success'>active</td>:
        <td className='bg-danger'>blocked</td>}
        <td><button onClick={()=>{this.edit(this.props.id)}}>Редактировать</button></td>
        <td><button onClick={()=>{this.delete(this.props.id)}}>Удалить</button></td>

      </tr>
    );
  }
}

export default MobileCompanyClients;