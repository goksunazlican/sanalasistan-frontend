import React, { Component } from 'react'
import Calendar from './Calendar';
import Navi from './Navi';
import Sidebar from './Sidebar';
import { Col, Container, Row } from 'reactstrap';

export default class MainPage extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Navi />
                    </Row>
                    <Row>
                        <Col xs="3">
                            <Sidebar title="Side Bar" />
                        </Col>
                        <Col xs="9">
                            <Calendar title="DashBoard" />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
