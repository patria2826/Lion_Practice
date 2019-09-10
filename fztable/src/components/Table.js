import React from 'react';
import './css/table.css';

const Table = function (props) {
    const [startDate, setStartDate] = React.useState('2018/12/30 (六)');
    const [endDate, setEndDate] = React.useState('2019/01/02 (二)');
    React.useEffect(() => {
        console.log(endDate)
    })
    let titleClassName = 'display-flex flex-center flex-col';
    let infoClassName = 'display-flex flex-center';
    let cellClassName = 'cellInfo display-flex flex-center';
    let tripStart = props.tripData ? props.tripData['data'].map((ele, i) => {
        return <div key={i} className={titleClassName}>{ele['date'].substring(5, 10) === "01/01" ? <span className="newYear">{ele['date'].substring(0, 4)}</span> : ''}<span>{ele['date'].substring(5, ele['date'].length)}</span></div>;
    }) : '';
    let tripEnd = props.tripData ? props.tripData['data'].map((ele, i) => {
        return <div key={i} className={titleClassName}>{ele['data'][i]['date_tripEnd'].substring(5, 10) === "01/01" ?
            <span className="newYear">{ele['data'][i]['date_tripEnd'].substring(0, 4)}</span> : ''}
            <span>{ele['data'][i]['date_tripEnd'].substring(5, ele['data'][i]['date_tripEnd'].length)}</span>
        </div>;
    }) : '';
    let columnData = props.tripData ? props.tripData['data'].map((ele, i) => {
        let row = Object.values(ele['data']);

        return <div key={i} className={startDate === ele['date'] ? infoClassName + ' crossed' : infoClassName} onClick={() => { setStartDate(ele['date']) }}>
            {row.map((element, index) => {
                return <div key={index}
                    className={endDate === element.date_tripEnd ? (startDate === element.date_tripStart ? cellClassName + ' crossed selected' : cellClassName + ' crossed') : cellClassName} onClick={() => { setEndDate(element.date_tripEnd) }}>{element.price}</div>
            })}
        </div>
    }) : '';
    return (
        <div className="display-flex width-inherit">
            <div className="pos-relative">
                <div className="title-left bg-top">
                    <div className="title-padding">
                        <p className="text-right">回程</p>
                        <p>去程</p>
                    </div>
                </div>
                <div className="title-left bg-left"><div className="display-flex flex-col flex-center">{tripStart}</div></div>
            </div>
            <div className="width-inherit pos-relative">
                <div className="display-flex flex-center title-top bg-top">{tripEnd}</div>
                <div>{columnData}</div>
            </div>
        </div>
    )
}.bind(document.querySelector('#root'));

export default Table;