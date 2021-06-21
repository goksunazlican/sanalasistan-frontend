import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';
import AddEventModal from '../Modals/AddEventModal';
import EditProfileModal from '../Modals/EditProfileModal';
import swal from 'sweetalert';
import {Login} from "../login/Login";
import  { Redirect } from 'react-router-dom'


export default class Sidebar extends Component {
    state = {
        showAddEventModal: false,
        showProfileModal: false,

    };

   logout = () => {
    swal("Oturum kapatılsın mı?", {
        buttons: {
          catch: {
            text: "Oturumu kapat!",
            value: "catch",
          },
          cancel: "İptal!",
        },
        
      })
      .then((value) => {
        switch (value) {
       
          case "catch":
            swal("Oturum kapatıldı.");
            //history.push("/login")       
            break;
        }
      });

    /*swal.fire({
        title: 'Oturum kapatılsın mı?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Evet`,
        cancelButtonText: `Vazgeç`,
    }).then((result) => {
        if(result.isConfirmed) {
            console.log("çıkış yapıldı");
            this.props.history.push("/login");
            //Swal.fire('Çıkış!', '', 'yapıldı')
        }
    })*/

    
}
    render() {
        return (
            <div className="sidebar">

                <div>
                    <ListGroup>
                        <ListGroupItem>AnaSayfa</ListGroupItem>
                        <ListGroupItem onClick={() => this.setState({ showAddEventModal: true })}>Etkinllik Ekle</ListGroupItem>
                        <ListGroupItem>Arkadaş Ekle</ListGroupItem>
                        <ListGroupItem onClick={() => this.setState({ showProfileModal: true })}>Profil Düzenle</ListGroupItem>
                    </ListGroup>
                </div>
                {this.state.showAddEventModal &&
                    <AddEventModal
                        modal={this.state.showAddEventModal}
                        toggleModal={(flag) => this.setState({ showAddEventModal: flag })}
                    />}

                {this.state.showProfileModal &&
                    <EditProfileModal
                        modal={this.state.showProfileModal}
                        toggleModal={(flag) => this.setState({ showProfileModal: flag })}
                    />}
            </div>
        )
    }
}
