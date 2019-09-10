import React from 'react';
import Column from './Column';
import './css/table.css';

const Table = (props) => {
    const [startDate, setStartDate] = React.useState('2018/12/30 (六)');
    const [endDate, setEndDate] = React.useState('2019/01/02 (二)');
    const getStartDate = (date) => {
        setStartDate(date);
    }
    const getEndDate = (date) => {
        setEndDate(date);
    }
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
        return <Column key={i}
            detailData={ele['data']}
            colClassName={startDate === ele['date'] ? infoClassName + ' crossed' : infoClassName}
            cellClassName={endDate === ele['date'] ? cellClassName + ' crossed' : cellClassName}
            start={ele['date']}
            returnStart={getStartDate}
            returnEnd={getEndDate} />;
    }) : '';
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td className="title-left bg-top">
                            <div className="title-padding">
                                <p className="text-right">回程</p>
                                <p>去程</p>
                            </div>
                        </td>
                        <td className="title-top bg-top"><div className="display-flex flex-center">{tripEnd}</div></td>
                    </tr>
                    <tr>
                        <td className="title-left bg-left"><div className="display-flex flex-col flex-center">{tripStart}</div></td>
                        <td>{columnData}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Table;