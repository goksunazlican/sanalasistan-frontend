import React, { Component } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { Col, Form, Label, Row } from "reactstrap"
import Datetime from "react-datetime"
import 'react-datetime/css/react-datetime.css'
import moment from "moment/moment"
import 'moment/locale/tr'
import { TimePicker } from 'antd'
import 'antd/dist/antd.css';
import StarRatingComponent from 'react-star-rating-component'
import Select from "react-select";
import alertify from "alertifyjs";
import axios from 'axios';
import Swal from "sweetalert2";
import Alert from "react-s-alert";
import SweetAlert from "react-bootstrap-sweetalert";
import swal from 'sweetalert';


export default class AddEventModal extends Component {


    state = {
        userId: 1,
        currentTime: '00:00',
        addEventModal: false,
        eventName: '',
        eventDescription: '',
        eventDate: '',
        startTime: "00:00",
        finishTime: "00:00",
        startDateTime: '',
        finishDateTime: '',
        rating: 1,
        eventStatus: '',
        statusList: [
            { value: 'COMPLETED', label: 'Tamamlandı' },
            { value: 'INPROGRESS', label: 'Devam Etmekte' },
            { value: 'CANCELLED', label: 'İptal Edildi' },
            { value: 'INHOLD', label: 'Beklemede' },],


    }

    /*componentDidMount() {
        this.fetch();
    }
        
    fetch = () => {
        this.setState({eventName: this.state.eventName}) 
    }
*/
    onChangeStatusList = (e) => {
        let {name, value } = e.target;
        if(name == 'statusType'){
            this.setState({ eventStatus: value })
        }
    }

    onChangeText = (e) => {
        let { name, value } = e.target;
        if (name === 'eventName') {
            this.setState({ eventName: value })
        } else if (name === 'eventDescription') {
            this.setState({ eventDescription: value })
        }
    }

    onChangeDate(momentObj, type) {
        let value;
        if (!(typeof momentObj === "string")) {

            if (type === "date") {
                value = momentObj.format("YYYY-MM-DD");
                this.setState({ value });
            } else if (type === "datetime") {
                value = momentObj.format("YYYY-MM-DD");
                this.setState({ value })
            } else if (type === "month") {
                value = momentObj.format("YYYY-MM-DD");
                this.setState({ value });
            }
        } else {
            value = momentObj;
            if (type === "datetime" && moment(value, "DD-MM-YYYY", true).isValid()) {
                value = moment(value, "DD-MM-YYYY", true).format("YYYY-MM-DD");
            }
            this.setState({ value })
        }

        this.setState({ eventDate: value })
    }

    onChangeTime = (e) => {
        let name = (e && e.target && e.target.name) ? e.target.name : '';
        let value = (e && e.target && e.target.value) ? e.target.value : '';
        if (name === 'startTime') {
            this.setState({ startTime: value })
        } else {
            this.setState({ finishTime: value })
        }
    }

    onStarClick = (nextValue, prevValue, name) => {
        this.setState({ rating: nextValue });
    }


    addEvent = () => {
        console.log(this.state.eventName, this.state.eventDescriptions, this.state.rating, this.state.startDateTime, this.state.finishDateTime)
        let self = this;
       
        let obj = {
            userId: self.state.userId,
            contentTitle: self.state.eventName,
            description: self.state.eventDescription,
            start_at: self.state.startDateTime,
            finish_at: self.state.finishDateTime,
            privacyLevel: self.state.rating,
            status: self.state.eventStatus
        };
        console.log(self.state.startTime, self.state.finishTime, self.state.eventDate)
       
        axios.post(`/api/user/saveEvent`, obj)
            .then(response => {
                if(response.data == "Event kaydedilemedi. Mevcut tarih dolu."){
                    
                      swal("Event kaydedilemedi. Mevcut tarih dolu. Yine de bu tarihe kaydetmek ister misiniz?", {
                        buttons: {
                          catch: {
                            text: "Kaydet. Eski etkinliği sil.",
                            value: "catch",
                          },
                          defeat: { text:"Kaydet. Eski etkinliği taşı.", value: "defeat"},
                          cancel: "İptal!",
                        },
                        
                      })
                      .then((value) => {
                        switch (value) {
                       
                          case "defeat":
                            swal("Eski etkinliği düzenle.","Yeni etkinlik kaydedildi!");
                            this.moveOldEvent();
                            //this.showOldEventInfo();
                            break;
                       
                          case "catch":
                            swal("Eski etkinlik silindi.", "Etkinlik kaydedildi!", "success");
                            this.terminateOldEvent();
                            break;
                       
                          default:
                            swal("Got away safely!");
                        }
                      });

                }
                else{
                    alertify.success("Etkinlik Oluşturuldu");
                    self.props.toggleModal(false);
                }
                
            }).catch(error => {
                alertify.error("İşleminiz gerçekleştirilemedi!");
            });

       // self.props.toggleModal(false);

    }

    moveOldEvent = () => {
        let self = this;
       
        let obj = {
            userId: self.state.userId,
            contentTitle: self.state.eventName,
            description: self.state.eventDescription,
            start_at: self.state.startDateTime,
            finish_at: self.state.finishDateTime,
            privacyLevel: self.state.rating,
            status: self.state.eventStatus
        };
        axios.post(`/api/user/swapAndMoveOldEvent`, obj)
        .then(response => {
            this.setState({ 
                eventName: response.data.contentTitle,
                eventDescription: response.data.description,
                startDateTime: response.data.start_at,
                finishDateTime: response.data.finish_at,
                rating: response.data.privacyLevel,
                eventStatus: response.data.status

             })
            console.log(this.state.eventName)
            

        }).catch(error => {
            alertify.error("İşleminiz gerçekleştirilemedi!");
        });

    }

    terminateOldEvent = () => {
        let self = this;
       
        let obj = {
            userId: self.state.userId,
            contentTitle: self.state.eventName,
            description: self.state.eventDescription,
            start_at: self.state.startDateTime,
            finish_at: self.state.finishDateTime,
            privacyLevel: self.state.rating,
            status: self.state.eventStatus
        };
        axios.post(`/api/user/swapAndTerminateOldEvent`, obj)
        self.props.toggleModal(false);

    }

    showSuitableTime = () => {
        //axios.post(`/api/partition/findAvaiblePartition`)
    }

    showOldEventInfo = () =>{
        let self = this;
       
        let obj = {
            userId: self.state.userId,
            contentTitle: self.state.eventName,
            description: self.state.eventDescription,
            start_at: self.state.startDateTime,
            finish_at: self.state.finishDateTime,
            privacyLevel: self.state.rating,
            status: self.state.eventStatus
        };
        axios.post(`/api/user/findEvent`, obj)
    }
    render() {
        console.log(this.state.status);
        return (
            <div>
                {this.state.alert}
                <Modal isOpen={this.props.modal} size='lg'>

                    <ModalHeader toggle={this.cancelModal}>
                        <div style={{ display: "inline-flex" }}>
                            <label>{"Etkinlik Ekleme"}</label>
                        </div>
                    </ModalHeader>

                    <ModalBody>
                        <div style={{ marginTop: '20px' }}>
                            <Form>
                                <div className="Form" style={{ marginBottom: '10px', paddingLeft: '20px', paddingRight: '20px' }}>
                                    <Row>
                                        <Col sm={12}>
                                            Etkinlik Adı: <input className="form-control"
                                                type="text"
                                                value={this.state.eventName}
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
                                            Etkinlik Detayı: <input className="form-control"
                                                type="text"
                                                value={this.state.eventDescription}
                                                onChange={(e) => this.onChangeText({
                                                    target: {
                                                        name: 'eventDescription',
                                                        value: (e && e.target && e.target.value) ? e.target.value : ''
                                                    }
                                                })} />
                                        </Col>
                                    </Row>
                                    <Label>&nbsp;&nbsp;</Label>
                                    <Row>
                                        <Col sm={12}>
                                            Etkinlik Tarihi: <Datetime locale="tr"
                                                className="datepicker"
                                                input={true}
                                                closeOnSelect={true}
                                                value={moment(this.state.eventDate, "YYYY-MM-DD", true).isValid() ? moment(this.state.eventDate).format("DD-MM-YYYY") : this.state.eventDate}
                                                dateFormat="DD-MM-YYYY"
                                                timeFormat={false}
                                                onChange={(e) => this.onChangeDate(e, "date")}
                                                inputProps={{ readOnly: true }} />
                                        </Col>
                                    </Row>
                                    <Label>&nbsp;&nbsp;</Label>
                                    <Row>
                                        <Col sm={6}>
                                            Etkinlik Başlama Saati: <TimePicker
                                                minuteStep={30}
                                                defaultValue={moment(this.state.currentTime, 'HH:mm')}
                                                format='HH:mm'
                                                allowClear={false}
                                                showNow={false}
                                                value={moment(this.state.startTime, "HH:mm")}
                                                onSelect={(value) => {
                                                    const timeString = moment(value).format("HH:mm");
                                                    this.setState({ startTime: timeString })
                                                    this.setState({startDateTime: this.state.eventDate+ 'T' + this.state.startTime});
                                                }}
                                            />
                                        </Col>
                                        <Col sm={6}>
                                            Etkinlik Bitiş Saati: <TimePicker
                                                minuteStep={30}
                                                defaultValue={moment(this.state.currentTime, 'HH:mm')}
                                                format='HH:mm'
                                                allowClear={false}
                                                showNow={false}
                                                value={moment(this.state.finishTime, "HH:mm")}
                                                onSelect={(value) => {
                                                    const timeString2 = moment(value).format("HH:mm");
                                                    this.setState({ finishTime: timeString2 })
                                                    this.setState({finishDateTime: this.state.eventDate+ 'T' + this.state.finishTime});
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Label>&nbsp;&nbsp;</Label>
                                    <Row>
                                        <Col sm={12}>
                                            Önem Derecesi: <StarRatingComponent
                                                name="rate1"
                                                starCount={5}
                                                value={this.state.rating}
                                                onStarClick={this.onStarClick.bind(this)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={12}>
                                            Durum Bilgisi: <Select
                                                className="select-control"
                                                placeholder="Seçiniz..."
                                                value={this.state.eventStatus ? this.state.eventStatus.value: 'INPROGRESS'}
                                                onChange={(e) => {
                                                 this.onChangeStatusList({
                                                   target: {
                                                     name: 'statusType',
                                                     value: (e && e.value) ? e.value : 'INPROGRESS'
                                                   }, e
                                                 });
                                                }}
                                                options={this.state.statusList}
                                            />
                                        </Col>
                                    </Row>
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
                                    onClick={() => this.addEvent()}>Kaydet
								</button>
                            </div>

                        </nav>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
