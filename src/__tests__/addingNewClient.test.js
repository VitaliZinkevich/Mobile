import React from 'react';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { mount } from 'enzyme';
import MobileCompany from '../components/MobileCompany'
import {fromJS} from 'immutable'

const name = 'Velcome'
const clients = [
    {"id":100, "lastName":"Иванов", "firstName":"Иван", "fatherName":"Иванович", "balance":200}, 
    {"id":105, "lastName":"Сидоров", "firstName":"Сидор", "fatherName":"Сидорович", "balance":-250},
]

let immutableClients = fromJS(clients)

describe('Adding new client', function() {

    it ('Fill adding form and add new client',()=>{
        let instance = mount(<MobileCompany 
            name ={name}
            clients ={immutableClients}
        />)

        instance.find('.addButton').simulate('click')

        let addingMock = ['Тест','Тест','Тест', 1000]
        let addingNamesMock =['firstName', 'lastName', 'fatherName', 'balance']
        
        instance.find('.addClientForm').find('input').forEach((el, index)=>{
            
            el.simulate("change", { target: { value: addingMock[index],
                                              name: addingNamesMock[index]}})
            
        })

       instance.find('.addClientForm').find('#addNewClient').simulate('click')

       expect (instance.find('.testClientRender').length).toBe(3)
    })

  });
