import React from 'react';

import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';


import MobileCompanyClients from './MobileCompanyClients'
import AddingNewClient from './AddNewClient'
import EditedClient from './EditedClient'

import { addNewClient, deleteClient, editClient } from '../events';

class MobileCompany extends React.PureComponent {

    static propTypes = {
        name: PropTypes.string.isRequired,
        clients: ImmutablePropTypes.listOf(
            ImmutablePropTypes.contains({
                id: PropTypes.number.isRequired,
                lastName: PropTypes.string.isRequired,
                firstName: PropTypes.string.isRequired,
                fatherName: PropTypes.string.isRequired,
                balance: PropTypes.number.isRequired,
            })
        ),
    };

    constructor(props) {
        super(props);
  
        this.state = {
            name: this.props.name,
            clients: this.props.clients,
            notFiltredСlients: this.props.clients,
            editId: null,
            addingNewClient: false}
        
      }


    componentDidMount = () => {
        addNewClient.addListener('cancelAdding', this.cancelAddingNewClient);
        addNewClient.addListener('addingNewClient', this.newClientRecived);
        deleteClient.addListener('deleteClient', this.deleteOneClient);
        editClient.addListener('editClient', this.editOneClient);
        editClient.addListener('cancelEditClient', this.cancelEditOneClient);
        editClient.addListener('saveEditClient', this.saveEditOneClient);
        
    };

    componentWillUnmount = () => {
        addNewClient.removeListener('cancelAdding', this.cancelAddingNewClient);
        addNewClient.removeListener('addingNewClient', this.newClientRecived);
        deleteClient.removeListener('deleteClient', this.deleteOneClient);
        editClient.removeListener('editClient', this.editOneClient);
        editClient.removeListener('cancelEditClient', this.cancelEditOneClient);
        editClient.removeListener('saveEditClient', this.saveEditOneClient);

    };

    setNameMTS = () => {
        this.setState({ name: 'MTS' })
    }

    setNameVelcome = () => {
        this.setState({ name: 'Velcom' })
    }

    addingNewClient = () => {
        if (this.state.addingNewClient === true) {
            this.setState({ addingNewClient: false })
        } else {
            this.setState({ addingNewClient: true })
        }

    }

    newClientRecived = (client) => {
       
        let newClients = this.state.clients.push(client)
        this.setState({ clients: newClients, addingNewClient: false, notFiltredСlients: newClients})
    }


    cancelAddingNewClient = () => {
        this.setState({ addingNewClient: false })
    }

    deleteOneClient = (id) => {

        let newClients = this.state.clients.filter((client) => {
            if (client.get('id') === id) {
                return false
            } else {
                return true
            }
        })

        this.setState({ clients: newClients, notFiltredСlients: newClients })

    }

    editOneClient = (id) => {
        this.setState({ editId: id })
    }

    cancelEditOneClient = () => {
        this.setState({ editId: null })
    }

    saveEditOneClient = (client) => {
        
        let newClients = this.state.clients

        newClients = newClients.map((c) => {
            
            if (c.get('id') === client.get('id')) {
                return client
            } else {
                return c
            }

        })

        this.setState({ clients: newClients, editId: null,notFiltredСlients: newClients })
    }

    filterAll = () => {
        this.setState({ clients: this.state.notFiltredСlients })
    }

    filterActive = () => {

        let active = this.state.notFiltredСlients
        active = active.filter((c) => {
            if (c.get('balance') > 0) {
                return true
            } else {
                return false
            }
        })

        this.setState({ clients: active })
    }

    filterBanned = () => {
        let banned = this.state.notFiltredСlients
        banned = banned.filter((c) => {
            if (c.get('balance') <= 0) {
                return true
            } else {
                return false
            }
        })

        this.setState({ clients: banned })

    }


    render() {
        console.log('render COMPANY component')
                
        let newClientList = this.state.clients
               
        let newClientListView = newClientList.map((client) => {
        
        if (client.get('id') === this.state.editId){
            return (
                <EditedClient
                key= {client.get('id')}
                client={client}
            />)
        } else {
            return (
                <MobileCompanyClients
                key= {client.get('id')}
                client={client}
            />)
        }    
     
    })




        return (
            <div className='row'>

                <div className='col-12'>
                    <button onClick={this.setNameVelcome}>Velcom</button>
                    <button id='nameMts'onClick={this.setNameMTS}>MTS</button>
                    <div id='companyName'>Компания: {this.state.name}</div>

                    <hr />
                    <button onClick={this.filterAll} className='allFilter'>Все</button>
                    <button onClick={this.filterActive} className='activeFilter'>Активные</button>
                    <button onClick={this.filterBanned} className='bannedFilter'>Заблокированные</button>
                    <hr />
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
                                <th>Редактировать</th>
                                <th>Удалить</th>

                            </tr>

                        </thead>
                        <tbody>
                            {newClientListView}
                        </tbody>

                    </table>
                </div>

                <div className='col-12'>
                    <button className='addButton' onClick={this.addingNewClient}>Добавить клиента </button>

                    {this.state.addingNewClient === true ?
                        <AddingNewClient /> :
                        null}

                </div>

            </div>
        );
    }
}

export default MobileCompany;