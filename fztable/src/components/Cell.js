import React, { Component } from 'react';

class Td extends Component {
    cellClass="cellInfo display-flex flex-center";
    cellClicked = () => {
        
        console.log(this.cell.current)
    }
    render() {
        return (
            <div className={this.cellClass} onClick={this.cellClicked}>
                <span>{this.props.detailData['price']}</span>
            </div>
        )
    }
}
export default Td;