import React, { Component } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import alertify from "alertifyjs";
import axios from 'axios';

export default class DailyScheduler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate : '',
            schedulerData : [
                { startDate: '2021-06-03T09:45', endDate: '2021-06-03T11:00', title: 'Meeting' },
                { startDate: '2021-06-03T12:00', endDate: '2021-06-03T13:30', title: 'Go to a gym' },
              ]
        }
    }
    componentDidMount() {
        this.fetch();
    }
    fetch = () => {
        let self = this;
        self.setState({currentDate: self.props.selectedDate})
        axios.post(`/api/plan/getPlanByDateTime`, {dateTime: self.props.selectedDate})
           .then(response => {

                console.log(response.data);
               this.setState({schedulerData: response.data })
               
           }).catch(error => {
               alertify.error("İşleminiz gerçekleştirilemedi!");
           });
       
        
    }

    editingPlan = () => {
        let self = this;
        axios.post(`/api/plan/createGreedyPlan`, {dateTime: self.props.selectedDate})
            .then(response => {
                alertify.success("Plan Düzenlendi");
                this.fetch();
            }).catch(error => {
                alertify.error("İşleminiz gerçekleştirilemedi!");
            });
        
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.modal} size='lg'> 
                    
                    <ModalHeader toggle={this.cancelModal}>
                        <div style={{ display: "inline-flex" }}>
                            <label>{"Günlük Plan"}</label>
                        </div>
                    </ModalHeader>

                    <ModalBody>
                        <Paper>
                            <Scheduler
                                data={this.state.schedulerData}
                            >
                                <ViewState
                                    currentDate={this.state.currentDate}
                                />
                                <DayView
                                    startDayHour={0}
                                    endDayHour={24}
                                />
                                <Appointments />
                            </Scheduler>
                        </Paper>

                    </ModalBody>
                    <ModalFooter>
                        <nav className="col-sm-12 row">
                            <div className="col-sm-2">
                                <button type="button" data-toggle="tooltip" data-placement="bottom"
                                    style={{ background: 'rgb(158, 158, 158)', padding: '11px 45px 11px 20px' }}
                                    rel="tooltip" className="iptal"
                                    onClick={() => this.props.toggleModal(false)}>Kapat
                                </button>
                            </div>
                            <div className="col-sm-8"></div>
                            <div className="col-sm-2">
                                <button type="button" data-toggle="tooltip" data-placement="bottom"
                                    style={{ background: 'linear-gradient(rgba(159, 208, 55, 0.6), #9fd037)', padding: '11px 45px 11px 20px' }}
                                    rel="tooltip" className="kaydet"
                                    onClick={() => this.editingPlan()}>Otomatik Tasarla
								</button>
                            </div>

                        </nav>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}