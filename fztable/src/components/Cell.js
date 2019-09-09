import React, { Component } from 'react';

class Td extends Component {
    render() {
        return (
            <div className="cellInfo display-flex flex-center">
               <span>{this.props.detailData['price']}</span>
            </div>
        )
    }
}
export default Td;