import React from 'react';
//import PropTypes from 'prop-types';
//import './EditedClient.css'

import {editClient} from '../events'

class EditedClient extends React.PureComponent {

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
  // Don't call this.setState() here!
  let jsClient = this.props.client.toJS()
  this.state = { client: jsClient };
 
}

cancel=()=>{
    editClient.emit ('cancelEditClient')
}

handleChange = (e)=>{
    if (e.target.name === 'balance') {
        this.setState ({balance: e.target.value})
    } else {
    
        let newData = {...this.state.FIO, [e.target.name]: e.target.value}
        this.setState ({FIO: newData})

    }
    
}

saveNewData=()=>{

    let editedClient = {...this.state.FIO, id: this.state.id, balance: this.state.balance}
    editClient.emit ('saveEditClient', editedClient)
}

  render() {
    console.log (`render EDIT_CLIENT ${this.state.client.id}`)
    return (
      <tr className='edit' >
      <td className=''>
      <input size="3" name='lastName' onChange={this.handleChange} value={this.state.client.lastName}/></td>
      <td className=''>
      <input size="2" name='firstName' onChange={this.handleChange} value={this.state.client.firstName}/></td>
      <td className=''>
      <input size="4" name='fatherName' onChange={this.handleChange} value={this.state.client.fatherName}/></td>

      <td className=''>
      <input size="1" name='balance' onChange={this.handleChange} value={this.state.client.balance}/></td>
        {this.state.client.balance > 0 ? 
        <td className='bg-success '>active</td>:
        <td className='bg-danger '>blocked</td>}
        <td className=''><button onClick={this.saveNewData}>Сохранить</button></td>
        <td className=''><button onClick={this.cancel}>Отмена</button></td>

      </tr>
    );
  }
}

export default EditedClient;