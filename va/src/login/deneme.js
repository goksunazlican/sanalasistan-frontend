import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function Deneme() {
  let history = useHistory(); // error saying invalid hook call
  let location = useLocation();
  console.log(history);



  return   (
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
    </div>
);
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
        .then((user) => {
            alertify.success("Giriş Başarılı.");
            this.props.history.push('/home');
        }).catch(function (error) {
            alertify.error("Hatalı İşlem!");
        });

}


export default Deneme;