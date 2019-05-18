import React from 'react';
import ReactDOM from 'react-dom';
import Login from './container/Login';
import MainPage from './container/Main'
import socketIOClient from 'socket.io-client'
import ReactTime from './container/ReactTime'
import NumberMemory from './container/NumberMemory'
//import ServiceWorker from './ServiceWorker';
const port = "localhost:4001"
const socket = socketIOClient(port);
socket.on('start',() => {
    ReactDOM.render(<MainPage logged = {false} socket={socket}/>, document.getElementById('root'));
})
socket.on("loginPage", () => {
    ReactDOM.render(<Login socket={socket}/>, document.getElementById('root'));
})
socket.on('mainPage',(acc) => {
    console.log("Loading Main Page")
    ReactDOM.render(<MainPage logged = {true} socket={socket} acc={acc}/>, document.getElementById('root'));
})

socket.on("reactTime", acc => {
    ReactDOM.render(<ReactTime socket={socket} acc={acc}/>, document.getElementById('root'));
})

socket.on("NumMem", acc => {
    ReactDOM.render(<NumberMemory socket={socket} acc={acc}/>, document.getElementById('root'));
})
//ServiceWorker();
