import React from "react";
import loginImg from "../image/logo.png";
import alertify from "alertifyjs";
import axios from 'axios';
import Swal from "sweetalert2";
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";


export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",

        }
    }


    loginUser = () => {
        const { username, password } = this.state;
    
        //added
        const data = { 
           username,
           password
        }
        let user = {
            authdata: '',
        }

        axios.post(`/api/user/loginUser`, data)
            .then(() => {
                alertify.success("Giriş Başarılı.");
                this.props.history.push('/home');
            }).catch(function (error) {
                alertify.error("Hatalı İşlem!");
            });

    }

    register= () => {
        this.props.history.push('/register');
    } 

    

    handleResponse = (response) => {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    // auto logout if 401 response returned from api
                    this.logout();
                    window.location.reload(true);
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
    }

    render() {
        const { match, location, history } = this.props;
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header">Giriş</div>
                <div className="content">
                    <div className="image">
                        <img src={loginImg}></img>
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="username">Kullanıcı Adı</label>
                            <input type="text" name="username" placeholder="kullanıcı adınız" value={this.state.username}
                                onChange={(e) => this.setState({ username: e.target.value })}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Parola</label>
                            <input type="password" name="password" placeholder="parola" value={this.state.password}
                                onChange={(e) => this.setState({ password: e.target.value })}></input>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button type="button" className="btn" onClick={() => this.loginUser()} >Giriş</button>
                </div>
                <div className="footer">
                    <button type="button" className="btn" onClick={() => this.register()} >Kaydol</button>
                </div>
            </div>
        );
    }
}
const LoginWithRouter = withRouter(Login);
