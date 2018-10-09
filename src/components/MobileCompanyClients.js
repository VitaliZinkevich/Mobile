import React from 'react';
import PropTypes from 'prop-types';

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


  render() {
    console.log (`render CLIENT ${this.props.id}`)
    return (
      <tr >
      <td>{this.state.FIO.lastName}</td>
      <td>{this.state.FIO.firstName}</td>
      <td>{this.state.FIO.fatherName}</td>

      <td>{this.state.balance}</td>
        {this.state.balance > 0 ? 
        <td className='bg-success'>active</td>:
        <td className='bg-danger'>blocked</td>}
        
      </tr>
    );
  }
}

export default MobileCompanyClients;