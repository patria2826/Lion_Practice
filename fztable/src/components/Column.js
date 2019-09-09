import React from 'react';
import Cell from './Cell';

const Column = (props) => {
    let cellData = props.detailData ? props.detailData.map((ele, i) => {
        return <Cell key={i} detailData={ele} />;
    }) : '';
    return (
        <div className="display-flex flex-center text-center">
            {cellData}
            {/* <Cell price={props.detailData['price']}/> */}
        </div>
    )
}

export default Column;