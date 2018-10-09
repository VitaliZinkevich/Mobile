import React from 'react';
import PropTypes from 'prop-types';

import MobileCompanyClients from './MobileCompanyClients'
import AddingNewClient from './AddNewClient'

import {addNewClient} from '../events';

class MobileCompany extends React.PureComponent {

    static propTypes = {
        name: PropTypes.string.isRequired,
        clients:PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            lastName: PropTypes.string.isRequired,
            firstName: PropTypes.string.isRequired,
            fatherName: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired,
          })
        ),
    };

    state = {
        name: this.props.name,
        clients: this.props.clients,
        addingNewClient:false,
      };
    

    componentDidMount = () => {
        addNewClient.addListener('cancelAdding',this.cancelAddingNewClient);
        addNewClient.addListener('addingNewClient',this.newClientRecived);
    };
    
      componentWillUnmount = () => {
        addNewClient.removeListener('cancelAdding',this.cancelAddingNewClient);
        addNewClient.removeListener('addingNewClient',this.newClientRecived);
    };


    setNameMTS = ()=>{
     this.setState ({name: 'MTS'})
    }  

    setNameVelcome = ()=>{
        this.setState ({name: 'Velcome'})
       } 
    
    addingNewClient=()=>{
        this.setState ({addingNewClient: true})
    }

    newClientRecived=(client)=>{
        console.log (client)
    }


    cancelAddingNewClient=()=>{
        this.setState ({addingNewClient:false})
    }

  render() {
    console.log ('render COMPANY component')
   
    let clientList = [...this.state.clients].map ((client)=>{
        let FIO={lastName:client.lastName,firstName:client.firstName,fatherName:client.fatherName};
        return (<MobileCompanyClients 
            key={client.id}
            id={client.id} 
            balance={client.balance}
            FIO={FIO}
            />)
    })




    return (
      <div className='row'>

      <div className='col-12'>
      <button onClick={this.setNameVelcome}>Velcome</button>
      <button onClick={this.setNameMTS}>MTS</button>
      <div>{this.state.name}</div>
      </div>

      <div className='col-12'>
      <table className='table'>
      <thead>
        <tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Баланс</th>
            <th>Статус</th>

        </tr>

      </thead>
      <tbody>
         {clientList}
       </tbody>

      </table>
      </div>

      <div className='col-12'>
      <button onClick={this.addingNewClient}>Добавить клиента </button>

      {this.state.addingNewClient === true?
      <AddingNewClient/>:
      null}

      </div>
        
      </div>
    );
  }
}

export default MobileCompany;