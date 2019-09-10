import React from 'react';
import Cell from './Cell';

const Column = (props) => {
    let cellClassName = 'cellInfo display-flex flex-center';
    const getStartDate = () => {
        props.returnStart(props.start);
    }
    const getEndDate = (enddate) => {
        props.returnEnd(enddate);
    }
    let cellData = props.detailData ? props.detailData.map((ele, i) => {
        return <Cell key={i} cellClassName={cellClassName} detailData={ele} returnEnd={getEndDate} />;
    }) : '';
    return (
        <div className={props.colClassName} onClick={() => { getStartDate(); }}>
            {cellData}
        </div>
    )
}

export default Column;