import React, { Component } from 'react';
import notFound from './image/NotFoundImage.png';
export default class NotFound extends Component {
    render() {
        return (
            <div className="row">
                <div className="notFound">
                    <img src={notFound} style={{height: '1100px', width: '1500px'}}/>
            </div>
            </div>
        )
    }
}
