import React from 'react';
import Column from './Column';
import './css/table.css';

const Table = (props) => {
    let whichDay = props.tripData ? props.tripData['data'].map((ele, i) => {
        return <div key={i} className="display-flex flex-center"><span>{ele['date'].substring(5, ele['date'].length)}</span></div>;
    }) : '';
    let columnData = props.tripData ? props.tripData['data'].map((ele, i) => {
        return <Column key={i} detailData={ele['data']} />;
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
                        <td className="title-top bg-top"><div className="display-flex flex-center">{whichDay}</div></td>
                    </tr>
                    <tr>
                        <td className="title-left bg-left"><div className="display-flex flex-col flex-center">{whichDay}</div></td>
                        <td>{columnData}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Table;