import React from 'react';

import MobileCompany from './components/MobileCompany'
let mock = require ('./mock.json')
let companyName = 'Velcom'

class App extends React.PureComponent {
  render() {
    console.log ('render APP component')
       return (
      <MobileCompany 
      name ={companyName}
      clients ={mock}
      />
    );
  }
}

export default App;
