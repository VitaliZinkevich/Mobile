import React from 'react';
import PropTypes from 'prop-types';

import MobileCompanyClients from './MobileCompanyClients'
import AddingNewClient from './AddNewClient'
import EditedClient from './EditedClient'

import {addNewClient, deleteClient, editClient} from '../events';

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
        editId: null
      };
    

    componentDidMount = () => {
        addNewClient.addListener('cancelAdding',this.cancelAddingNewClient);
        addNewClient.addListener('addingNewClient',this.newClientRecived);
        deleteClient.addListener('deleteClient',this.deleteOneClient);
        editClient.addListener('editClient',this.editOneClient);
        editClient.addListener('cancelEditClient',this.cancelEditOneClient);
        editClient.addListener('saveEditClient',this.saveEditOneClient);

    };
    
      componentWillUnmount = () => {
        addNewClient.removeListener('cancelAdding',this.cancelAddingNewClient);
        addNewClient.removeListener('addingNewClient',this.newClientRecived);
        deleteClient.removeListener('deleteClient',this.deleteOneClient);
        editClient.removeListener('editClient',this.editOneClient);
        editClient.removeListener('cancelEditClient',this.cancelEditOneClient);
        editClient.removeListener('saveEditClient',this.saveEditOneClient);

    };


    setNameMTS = ()=>{
     this.setState ({name: 'MTS'})
    }  

    setNameVelcome = ()=>{
        this.setState ({name: 'Velcom'})
       } 
    
    addingNewClient=()=>{
        if (this.state.addingNewClient === true) {
            this.setState ({addingNewClient: false})
        } else {
            this.setState ({addingNewClient: true})
        }
        
    }

    newClientRecived=(client)=>{
        console.log (client)
        let newClients = [...this.state.clients]
        newClients.push(client)
        this.setState ({clients:newClients,addingNewClient:false})
    }


    cancelAddingNewClient=()=>{
        this.setState ({addingNewClient:false})
    }

    deleteOneClient=(id)=>{

        let newClients = [...this.state.clients].filter ((client)=>{
            if (client.id === id) {
                return false
            } else {
                return true
            }
        })

        this.setState ({clients: newClients})

    }

    editOneClient=(id)=>{
        this.setState ({editId : id})
    }

    cancelEditOneClient=()=>{
        this.setState ({editId: null})
    }

    saveEditOneClient=(client)=>{
        let newClients = [...this.state.clients]
        
        newClients = newClients.map ((c)=>{
            if (c.id === client.id) {
             return client
            } else {
                return c
            } 

        })
       
        this.setState ({clients: newClients, editId:null})
    }

    filterAll=()=>{
        this.setState({clients: this.props.clients})
    }

    filterActive = ()=>{

        let active = [...this.props.clients]
        active = active.filter ((c)=>{
            if (c.balance>0){
                return true
            } else {
                return false
            }
        })

        this.setState ({clients : active})
    }

    filterBanned= ()=>{
        let banned = [...this.props.clients]
        banned = banned.filter ((c)=>{
            if (c.balance <=0 ){
                return true
            } else {
                return false
            }
        })

        this.setState ({clients : banned})

    }


  render() {
    console.log ('render COMPANY component')
   
    let clientList = [...this.state.clients].map ((client)=>{
        let FIO={lastName:client.lastName,firstName:client.firstName,fatherName:client.fatherName};
        
        if (this.state.editId === client.id) {
            return (<EditedClient 
            key={client.id}
            id={client.id} 
            balance={client.balance}
            FIO={FIO}
            />)
        } else {
        return (<MobileCompanyClients 
            key={client.id}
            id={client.id} 
            balance={client.balance}
            FIO={FIO}
            />)}
    })




    return (
      <div className='row'>

      <div className='col-12'>
      <button onClick={this.setNameVelcome}>Velcom</button>
      <button onClick={this.setNameMTS}>MTS</button>
      <div>Компания: {this.state.name}</div>
      
      <hr/>
      <button onClick={this.filterAll}>Все</button>
      <button onClick={this.filterActive}>Активные</button>
      <button onClick={this.filterBanned}>Заблокированные</button>
      <hr/>
      </div>

      <div className='col-12'>
      <table className='table w-100'>
      <thead>
        <tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Баланс</th>
            <th>Статус</th>
            <th>Редактировать</th>
            <th>Удалить</th>

        </tr>

      </thead>
      <tbody>
         {clientList}
       </tbody>

      </table>
      </div>

      <div className='col-12'>
      <button onClick={this.addingNewClient}>Добавить клиента </button>

      {this.state.addingNewClient === true ?
      <AddingNewClient/>:
      null}

      </div>
        
      </div>
    );
  }
}

export default MobileCompany;