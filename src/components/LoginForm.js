import React, { Component } from 'react';

import users from '../data/users.json';

// Importo llamada a endpoint
import {Login as LoginAPI} from "./controller/LoginController";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: '',
            user_pass: '',
            users: users,
            msj_error: false,
            usuarioValido: false,
            className: 'form-control',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    // Validacion de usuario segun el rol del mismo.
    handleSubmit = async (event) =>{
        event.preventDefault();
        
        // Ejecuto el endopoint para validar login
        let getLogin = await LoginAPI(this.state.user_name, this.state.user_pass);

        if(getLogin.rdo === 0 ) {
            this.setState({usuarioValido: true});
            this.redirect();
            console.log(localStorage.getItem('token'))
        } else {
            if(this.state.msj_error === false) {
                this.setState({msj_error: !this.state.msj_error})
                this.setState({className: "form-control is-invalid"});
            }
        }
    }

    // Si el usuario es valido, redirecciono. Si no, mensaje de error.
    redirect = () => {
        const userRol = localStorage.getItem('rol');

        switch(userRol) {
            case "Observatorio":
                this.props.history.push({
                    pathname: '/dashboard',
                })
                break;
            case "Observatorio_Admin":
                this.props.history.push({
                    pathname: '/dashboard',
                })
                break;
            case "Empresa":
                this.props.history.push({
                    pathname: '/empresa',
                })
                break;
            default:
                this.setState({msj_error: !this.state.msj_error})
                this.setState({className: "form-control is-invalid"})
                break;
        }

    }
    
    /*
    handleSubmit(event) {
        let user_name = this.state.user_name;
        let user_pass = this.state.user_pass;

        let userName = this.state.users.map(e => e.userName);
        let userPass = this.state.users.map(e => e.userPass);
        let userRol = this.state.users.map(e => e.userRol);

        let i = 0;
        let usuarioValido = false;
        while(i < userName.length) {
            if(userName[i].localeCompare(user_name) === 0 && userPass[i].localeCompare(user_pass) === 0) {
                usuarioValido = true;
                userName = user_name[i]
                userRol = userRol[i];
                break;
            }
            i++;
        }
        if(usuarioValido === true) {
            localStorage.setItem("rol",userRol);
            localStorage.setItem("name",userRol);
            if(userRol === "observatorio_admin" || userRol === "observatorio") {
                this.props.history.push('/dashboard');
            } else {
                this.props.history.push('/empresa');
            }
            
        } else {
            if(this.state.msj_error === false) {
                this.setState({msj_error: !this.state.msj_error})
                this.setState({className: "form-control is-invalid"});
            }
        }

        event.preventDefault();
    }
    */

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    render() {
        return (
            <div>
                <h4 className="text-center p-3">Iniciar sesi&oacute;n</h4>

                <form onSubmit={this.handleSubmit}>
                    <div className="row justify-content-center p-3">
                        <div className="col-md-10 mb-10">
                            <div className="form-group">
                                <input 
                                    id="user_name" 
                                    type="text" 
                                    name="user_name"  
                                    autoComplete="off" 
                                    autoFocus={true} 
                                    placeholder="Correo electr&oacute;nico" 
                                    required
                                    className={this.state.className}
                                    onChange={this.myChangeHandler} 
                                    value={this.state.user_name}/>
                            </div>
                        </div>
                        <div className="col-md-10 mb-10">
                            <div className="form-group">
                                <input 
                                    id="user_pass" 
                                    type="password" 
                                    name="user_pass" 
                                    autoComplete="off" 
                                    placeholder="Contrase&ntilde;a" 
                                    required
                                    className={this.state.className}
                                    onChange={this.myChangeHandler} 
                                    value={this.state.user_pass }/>
                            </div>
                        </div>
                        { this.state.msj_error ? ( <small className="text-danger">Ingresa un correo electr&oacute;nico y contrase&ntilde;a validos</small> ) : null }
                    </div>
                
                    <div className="row p-3 justify-content-center">
                        <div className="col-md-10 mb-10">
                            <button 
                                type="submit" 
                                value="Submit" 
                                id="submit-btn" 
                                className="btn btn-primary btn-block color-fundacion-boton"> Iniciar sesi&oacute;n
                            </button>
                        </div>
                    </div>    
                </form>
            </div>
        )
    }
}

export default LoginForm;