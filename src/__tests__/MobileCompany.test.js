import React from 'react';
import renderer from 'react-test-renderer';
import MobileCompany from '../components/MobileCompany'
import {fromJS} from 'immutable'


import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { mount } from 'enzyme';


const name = 'Velcome'
const clients = [
    {"id":100, "lastName":"Иванов", "firstName":"Иван", "fatherName":"Иванович", "balance":200}, 
    {"id":105, "lastName":"Сидоров", "firstName":"Сидор", "fatherName":"Сидорович", "balance":-250},
]
let immutableClients = fromJS(clients)

test('Match to snapShot init MobileCompony component render', () => {

    const component = renderer.create(
      <MobileCompany 
      name ={name}
      clients ={immutableClients}
      />
      
    );

  });

  test('Test filter buttons at MobileCompany component', () => {

    const componentRoot = renderer.create(
        <MobileCompany 
        name ={name}
        clients ={immutableClients}
        />
        
      ).root

    const activeButton = componentRoot.findByProps({className: 'activeFilter'}).props.onClick();
    expect(componentRoot.findByProps({className: 'w-100 testClientRender'})).length == 1;  
    
    const bannedButton = componentRoot.findByProps({className: 'bannedFilter'}).props.onClick();
    expect(componentRoot.findByProps({className: 'w-100 testClientRender'})).length == 1;

    const allButton = componentRoot.findByProps({className: 'allFilter'}).props.onClick();
    expect(componentRoot.findAllByProps({className: 'w-100 testClientRender'})).length == 2;

  });

  test('Test Edit and Delete buttons at MobileCompany component', () => {

    const componentRoot = renderer.create(
        <MobileCompany 
        name ={name}
        clients ={immutableClients}
        />
        
      ).root

    const editButtons = componentRoot.findAllByProps({className: 'editButton'})
    expect(componentRoot.findAllByProps({className: 'edit testRenderEdited'})).length == 1;

    // удалит элементы из памяти и другой тест после их не найдет. Нужно обновить рендер или делать в конце )))
    const deleteButtons = componentRoot.findAllByProps({className: 'delete'})
    deleteButtons.forEach ((elem)=>{
      elem.props.onClick();
    })
        
    expect(componentRoot.findAllByProps({className: 'w-100 testClientRender'})).length == 0;  

  });

  test('Test Add new client button', () => {

    const componentRoot = renderer.create(
        <MobileCompany 
        name ={name}
        clients ={immutableClients}
        />
        
      ).root

    const addButtons = componentRoot.findByProps({className: 'addButton'})
    addButtons.props.onClick()
    expect(componentRoot.findByProps({className: 'mt-2 addClientForm'})).length == 1;


  });

// test with enzyme

  describe ('Test Company name change', () => {

    it ('Fill adding form and add new client',()=>{
        let instance = mount( <MobileCompany 
          name ={name}
          clients ={immutableClients}
          />)

      instance.find('#nameMts').simulate('click')
      expect (instance.find('#companyName').text()).toBe('Компания: MTS')
    
    });

  })


