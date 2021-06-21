import React from "react";
import axios from 'axios'
import { Login } from "./Login";
import loginImg from "../image/logo.png";
import alertify from "alertifyjs";

export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            user_name: "",
            email: "",
            password: "",
        }
    }

    addUser = () => {
        let self = this;
        let obj = {
            first_name: self.state.first_name,
            last_name: self.state.last_name,
            user_name: self.state.user_name,
            email: self.state.email,
            password: self.state.password,
        };

        const {first_name, last_name, user_name, email, password } = self.state;
        const data = {
           firstName: first_name, 
           lastName: last_name, 
           username: user_name, 
           email, 
           password
        }

        axios.post(`/api/user/saveUser`, data)
            .then(response => {
                alertify.success("Kayıt oluşturuldu");
                this.props.history.push("/");
            }).catch(error => {
                alertify.error("Kayıt oluşturulamadı!");
            });      

    }


    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header">Kaydol</div>
                <div className="content">
                    <div className="image">
                        <img src={loginImg}></img>
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="firstname">Ad</label>
                            <input type="text" name="firstname" placeholder="adınız" value={this.state.first_name}
                                onChange={(e) => this.setState({ first_name: e.target.value })}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Soyad</label>
                            <input type="text" name="lastname" placeholder="soyadınız" value={this.state.last_name}
                                onChange={(e) => this.setState({ last_name: e.target.value })}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Kullanıcı Adı</label>
                            <input type="text" name="username" placeholder="kullanıcı adınız" value={this.state.user_name}
                                onChange={(e) => this.setState({ user_name: e.target.value })}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" placeholder="email" value={this.state.email}
                                onChange={(e) => this.setState({ email: e.target.value })}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Parola</label>
                            <input type="password" name="password" placeholder="parola" value={this.state.password}
                                onChange={(e) => this.setState({ password: e.target.value })}></input>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button type="button" className="btn" onClick={() => this.addUser()} >Kaydol</button>
                </div>
            </div>

        );
    }


}