import React from 'react';
import {addNewClient} from '../events';

class AddNewClient extends React.PureComponent {

    state = { newClient : {
        firstName:null,
        lastName:null,
        fatherName:null,
        balance:null,
        id:null},
        errors:[true,true,true,true],
        blockAddButton:true
    }

    handleChange=(e)=>{
        let client = {...this.state.newClient, [e.target.name]: e.target.value}
        this.setState ({newClient:client})

        this.validate(e.target.name, e.target.value)

    }

    validate = (name, value) =>{

        let newErrors = [...this.state.errors]
        
        switch (name) {
          case 'firstName':
          if (/^[а-яА-Я]+$/.test(value)) {
            newErrors[0] = false
            this.setState({errors : newErrors})
          } else {
            newErrors[0] = true
            this.setState({errors : newErrors})
          }
          break;
          case 'lastName':
          if (/^[а-яА-Я]+$/.test(value)) {
            newErrors[1] = false
            this.setState({errors : newErrors})
          } else {
            newErrors[1] = true
            this.setState({errors : newErrors})
          }
          break;
          case 'fatherName':
          if (/^[а-яА-Я]+$/.test(value)) {
            newErrors[2] = false
            this.setState({errors : newErrors})
          } else {
            newErrors[2] = true
            this.setState({errors : newErrors})
          }
              break;
          case 'balance':
          if (/^\d+$/.test(value)) {
            newErrors[3] = false
            this.setState({errors : newErrors})
          } 
          else {
            newErrors[3] = true
            this.setState({errors : newErrors})
          }
         
              break;
          default:
              // do nothing
              break;
          
      }
    
            
      if (newErrors.indexOf (true) === -1 ) {
        this.setState({blockAddButton : false})
      } else {
        this.setState({blockAddButton : true})
      }
    }

    cancelAdding=(e)=>{
        e.preventDefault()
        addNewClient.emit ('cancelAdding')
    }

    addNew=(e)=>{
        e.preventDefault()
        let newOne ={...this.state.newClient, id: Math.floor (Math.random()*1000)}
        addNewClient.emit ('addingNewClient', newOne)
    }


  render() {
    console.log ('render ADD CLIENT component')
       return (
           <div>
                <form>
                    <div>
                        <span>Имя</span><input onChange={this.handleChange} name='firstName'/>
                        {this.state.errors[0] === true ?
                        <div className='bg-danger'>Только текст кирилицей без пробелов</div>:
                        null}
                    </div>
          
                    <div>
                        <span>Фамилия</span><input onChange={this.handleChange} name='lastName'/>
                        {this.state.errors[1] === true ?
                        <div className='bg-danger'>Только текст кирилицей без пробелов</div>:
                        null}
                    </div>
                    <div>
                        <span>Отчество</span><input onChange={this.handleChange} name='fatherName'/>
                        {this.state.errors[2] === true ?
                        <div className='bg-danger'>Только текст кирилицей без пробелов</div>:
                        null}
                    </div>
                    <div>
                        <span>Баланс</span><input onChange={this.handleChange} name='balance'/>
                        {this.state.errors[3] === true ?
                        <div className='bg-danger'>Только число</div>:
                        null}
                    </div>
                    <button disabled={this.state.blockAddButton} onClick={this.addNew}>Добавить</button>
                    <button onClick={this.cancelAdding}>Отмена</button>

                </form>
           </div>
     
    );
  }
}

export default AddNewClient;
