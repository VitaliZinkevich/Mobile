import React from 'react';
//import PropTypes from 'prop-types';

import {deleteClient, editClient} from '../events'

class MobileCompanyClients extends React.PureComponent {

// static propTypes = {
//         id: PropTypes.number.isRequired,
//         FIO:PropTypes.shape({
//           lastName: PropTypes.string.isRequired,
//           firstName: PropTypes.string.isRequired,
//           fatherName: PropTypes.string.isRequired,
//         }),
//         balance: PropTypes.number.isRequired,
//       };
    
constructor(props) {
  super(props);

  let jsClient = this.props.client.toJS();


  this.state = {client : jsClient};
 
 
}


delete=(id)=>{

  deleteClient.emit('deleteClient', id)
    // if (window.confirm(`Действительно удалить клиента с ай ди ${id}`) === true) {
        
    // }
    
}

edit =(id)=>{
  editClient.emit ('editClient', id)
}

  render() {
    console.log (`render CLIENT ${this.state.client.id}`)
    return (
      <tr className='w-100 testClientRender'>
      <td>{this.state.client.lastName}</td>
      <td>{this.state.client.firstName}</td>
      <td>{this.state.client.fatherName}</td>

      <td>{this.state.client.balance}</td>
        {this.state.client.balance > 0 ? 
        <td className='bg-success'>active</td>:
        <td className='bg-danger'>blocked</td>}
        <td><button className='editButton' onClick={()=>{this.edit(this.state.client.id)}}>Редактировать</button></td>
        <td><button className='delete' onClick={()=>{this.delete(this.state.client.id)}}>Удалить</button></td>

      </tr>
    );
  }
}

export default MobileCompanyClients;