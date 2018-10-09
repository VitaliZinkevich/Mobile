import {EventEmitter} from 'events';

// добавление нового клиента
let addNewClient=new EventEmitter(); 

// удаление клиента
let deleteClient = new EventEmitter(); 

// редактирование клиента
let editClient = new EventEmitter(); 

export {addNewClient, deleteClient, editClient};