import React from "react";
import LoginPage from '../components/LoginPage';
import "../css/Login.css"
class Login extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        isLoginOpen: true
      };
    }
  
    showLoginBox = () => {
      this.setState({isLoginOpen: true});
    }
  
    showRegisterBox = () => {
      this.setState({isLoginOpen: false});
    }

    componentDidMount(){
      console.log("Login Mounted")
      this.props.socket.emit('test',"test")
    }
  
    render() {
      return (
        <div className="root-container">
  
          <div className="box-controller">
            <div
              className={"controller " + (this.state.isLoginOpen
              ? "selected-controller"
              : "")}
              onClick={this
              .showLoginBox
              .bind(this)}>
              Login
            </div>
            <div
              className={"controller " + (this.state.isRegisterOpen
              ? "selected-controller"
              : "")}
              onClick={this
              .showRegisterBox
              .bind(this)}>
              Register
            </div>
          </div>
   
          {this.state.isLoginOpen && <div className="box-container"><LoginBox socket={this.props.socket}/></div>}
          {!this.state.isLoginOpen && <div className="box-container"><RegisterBox socket={this.props.socket} 
                                           regComplete = {this.showLoginBox}/></div>}
  
        </div>
      );
  
    }
  
  }

  class LoginBox extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        username : "",
        password : ""
      };
    }
    submitLogin = (e) => {
      this.props.socket.emit('login',{
        username : this.state.username,
        password : this.state.password
      })
      console.log("login submitted")
    }
    handleUserChange = e => {this.setState({
      username : e.target.value
    })} 

    handlePasswordChange = e => {this.setState({
      password : e.target.value
    })} 
  
    render() {
      return (
        <LoginPage action="Login" userOnChange={this.handleUserChange} passOnChange={this.handlePasswordChange} 
                   submit={this.submitLogin}></LoginPage>
      );
    }
  
  }

  class RegisterBox extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        username : "",
        password : ""
      };
    }
  
    submitRegister = (e) => {
      this.props.socket.emit('reg',{
        username : this.state.username,
        password : this.state.password
      })
      this.props.regComplete()
      console.log("reg submitted")
    }
    handleUserChange = e => {this.setState({
      username : e.target.value
    })} 

    handlePasswordChange = e => {this.setState({
      password : e.target.value
    })} 
  
    render() {
      return (
        <LoginPage action="Register" userOnChange={this.handleUserChange} passOnChange={this.handlePasswordChange} 
        submit={this.submitRegister}></LoginPage>
      );
    }
  
  }

export default Login