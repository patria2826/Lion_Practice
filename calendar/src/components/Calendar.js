import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './css/Calendar.css';

const Calendar = (props) => {
    // set state and get props
    const [completeData, setCompleteData] = useState(0);
    const [monthsShowed, setMonthsShowed] = useState(0);
    const { dataSource, initYearMonth, dataKeySetting, onClickPrev, onClickNext, onClickDate } = props;

    // set variants
    const weekdays = [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
    ];
    let allMonths = useRef();

    const getData = async () => {
        return await axios.get(dataSource, {
            headers: {
                'Accept': 'application/json'
            }
        });
    }
    const response = getData();

    // Life cycle
    useEffect(() => {
        if (response.data) { setCompleteData(response.data) }
    }, [response.data]);
    useEffect(() => {
        if (completeData) { 
            allMonths.current = Array.from(new Set(completeData.map((data) => { return data['date'].substring(0, 7) }))).sort();
         }
    })

    return (
        <div className="calender display-flex">
            {/* <div className="calendar-top display-flex">
                <a className="arrow" href="#"></a>
                <ul className="month-list display-flex">
                    {monthsShowed.map((ele, i) => { return <li key={i}><a href="#">{ele.replace('/', ' ')}月</a></li> })}
                </ul>
                <a className="arrow arrow-right" href="#"></a>
            </div>
            <ul className="weekdays display-flex">
                {weekdays.map((ele, i) => { return <li key={i}>{ele}</li> })}
            </ul>
            <div className="month-days">
            </div> */}
        </div>
    )
}
export default Calendar;