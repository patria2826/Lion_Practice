import React, { Component } from 'react';

class Cell extends Component {
    cellClicked = () => {
        this.props.returnEnd(this.props.detailData['date_tripEnd']);
    }
    render() {
        const { price, isTheCheapest } = this.props.detailData;
        return (
            <div className={this.props.cellClassName} onClick={this.cellClicked}>
                {typeof price === 'number' && isTheCheapest ? <div className="cheapestTriangle"></div> : ''}
                {typeof price === 'number' && isTheCheapest ? <span className="cheapest">最便宜</span> : ''}
                <span className="price">{typeof price === 'number' ? `$${price.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}` : price}</span>
                {typeof price === 'number' ? '起' : ''}
            </div>
        )
    }
}
export default Cell;