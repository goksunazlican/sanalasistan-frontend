import Password from 'antd/lib/input/Password';
import React, { Component } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import alertify from "alertifyjs";
import axios from 'axios';

export default class EditProfileModal extends Component {
    state= {
        name: '',
        surname: '',
        username: '',
        email: '',
        password: ''

    }
    componentDidMount() {
        this.fetchData();
    };

    fetchData = () => {
        let data = "username";
        axios.post(`/api/user/getUser`, data)
        .then(response => {
            alertify.success("Profil bilgileri getirildi.");
        }).catch( error => {
            alertify.error("İşleminiz gerçekleştirilemedi!");
        });
    }
    
    saveProfile = () => {
        let self = this;
        let obj = {
            name: self.state.name,
            surname: self.state.surname,
            username: self.state.username,
            email: self.state.email,
            password: self.state.password,
        };

        let data= JSON.stringify(obj)
        
        axios.post(`/api/user/saveUser`, data)
        .then(response => {
            alertify.success("Profil  bilgileri kaydedildi.");
        }).catch(error => {
            alertify.error("İşleminiz gerçekleştirilemedi!");
        });

        self.props.toggleModal(false);
    }
    render() {
        return (
            <div>
                {this.state.alert}
                <Modal isOpen={this.props.modal} size='lg'>

                    <ModalHeader toggle={this.cancelModal}>
                        <div style={{ display: "inline-flex" }}>
                            <label>{"Profile Düzenleme"}</label>
                        </div>
                    </ModalHeader>

                    <ModalBody>
                        <div style={{ marginTop: '20px' }}>
                            <Form>
                                <div className="Form" style={{ marginBottom: '10px', paddingLeft: '20px', paddingRight: '20px' }}>
                                    <Row>
                                        <Col sm={12}>
                                            Adı: <input className="form-control"
                                                type="text"
                                                value={this.props.value}
                                                onChange={(e) => this.onChangeText({
                                                    target: {
                                                        name: 'eventName',
                                                        value: (e && e.target && e.target.value) ? e.target.value : ''
                                                    }
                                                })} />
                                        </Col>
                                    </Row>
                                    <Label>&nbsp;&nbsp;</Label>
                                    <Row>
                                        <Col sm={12}>
                                            Soyadı: <input className="form-control"
                                                type="text"
                                                value={this.props.value}
                                                onChange={(e) => this.onChangeText({
                                                    target: {
                                                        name: 'eventName',
                                                        value: (e && e.target && e.target.value) ? e.target.value : ''
                                                    }
                                                })} />
                                        </Col>
                                    </Row>
                                    <Label>&nbsp;&nbsp;</Label>
                                    
                                </div>
                            </Form>
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <nav className="col-sm-12 row">
                            <div className="col-sm-2">
                                <button type="button" data-toggle="tooltip" data-placement="bottom"
                                    style={{ background: 'rgb(158, 158, 158)', padding: '11px 45px 11px 20px' }}
                                    rel="tooltip" className="iptal"
                                    onClick={() => this.props.toggleModal(false)}>İptal
                                </button>
                            </div>
                            <div className="col-sm-8"></div>
                            <div className="col-sm-2">
                                <button type="button" data-toggle="tooltip" data-placement="bottom"
                                    style={{ background: 'linear-gradient(rgba(159, 208, 55, 0.6), #9fd037)', padding: '11px 45px 11px 20px' }}
                                    rel="tooltip" className="kaydet"
                                    onClick={() => this.saveProfile()}>Kaydet
								</button>
                            </div>

                        </nav>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
