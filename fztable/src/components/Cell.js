import React, { Component } from 'react';

class Cell extends Component {
    state = {
        cellClass: "cellInfo display-flex flex-center"
    }
    cellClicked = () => {
        console.log(this.props.detailData);
        this.props.end(this.props.detailData.date_tripEnd);
    }
    render() {
        const { id, price, date, date_tripStart, date_tripEnd, isTheCheapest, isAvailable } = this.props.detailData;
        return (
            <div className={this.state.cellClass} onClick={this.cellClicked}>
                {typeof price === 'number' && isTheCheapest ? <div className="cheapestTriangle"></div> : ''}
                {typeof price === 'number' && isTheCheapest ? <span className="cheapest">最便宜</span> : ''}
                <span className="price">{typeof price === 'number' ? `$${price.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}` : price}</span>
                {typeof price === 'number' ? '起' : ''}
            </div>
        )
    }
}
export default Cell;