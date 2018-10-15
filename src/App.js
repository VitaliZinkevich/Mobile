import React from 'react';
import {fromJS} from 'immutable'

import MobileCompany from './components/MobileCompany'
let mock = require ('./mock.json')
let companyName = 'Velcom' // всегда иммутабельно

class App extends React.PureComponent {
  render() {
    let immutableMock =fromJS (mock)
    
    console.log ('render APP component')
    
    return (
      <MobileCompany 
      name ={companyName}
      clients ={immutableMock}
      />
    );
  }
}

export default App;
