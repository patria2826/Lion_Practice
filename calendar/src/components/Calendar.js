import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import './css/Calendar.css';

const Calendar = (props) => {
    // set state and get props
    const [completeData, setCompleteData] = useState(0);
    const [monthsSelected, setMonthsSelected] = useState(undefined);
    const [daysArray, setDaysArray] = useState([])
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

    let productsThisMonth = daysArray.map((ele, i) => {
        return <div key={i} className={ele === 'blank' ? ele + ' days' : 'days'}>
            {ele === 'blank' ? '' :
                <div className="info">
                    <span className="date">{ele.substring(8, 10)}</span>
                    <span>{completeData.filter((product) => { return product['date'] === ele })['date']}</span>
                    {/* <span>{completeData.filter((product) => { product['date'] === ele }) > 1 ? 'ss' : 'vv'}</span> */}
                </div>
                // completeData.map((ele, i) => { return Object.values(ele)[1].substring(0, 7) === allMonths.current[monthsSelected] ? Object.values(ele) : '' })
            }
        </div>
    })

    // set functions
    const getData = useCallback(
        async () => {
            const response = await axios.get(dataSource, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            setCompleteData(response.data)
        },
        [dataSource],
    );


    const selectMonth = function (e) {
        console.log(e.currentTarget.className)
        console.log(allMonths.current.indexOf(e.currentTarget.className))
        setMonthsSelected(allMonths.current.indexOf(e.currentTarget.className));
    }

    const prevMonth = function () {
        if (monthsSelected >= 1) {
            setMonthsSelected(monthsSelected - 1);
        }
    }

    const nextMonth = function () {
        if (monthsSelected < allMonths.current.length - 1) {
            setMonthsSelected(monthsSelected + 1);
        }
    }

    // Life cycle
    useEffect(() => {
        if (!completeData) { getData() }
    }, [completeData, getData]);
    useEffect(() => {
        if (completeData) {
            allMonths.current = Array.from(new Set(completeData.map((data) => { return data['date'].substring(0, 7) }))).sort();
            console.log(completeData)
        }
    })
    useEffect(() => {
        if (typeof monthsSelected != 'number' && allMonths.current) {
            // console.log(allMonths.current)
            // console.log(allMonths.current.slice(0, 3))
            allMonths.current.map((ele, i) => { if (ele.replace('/', '') === initYearMonth) { setMonthsSelected(i); } return i; });
        }
    })
    useEffect(() => {
        if (typeof monthsSelected === 'number') {
            // get days in a month
            const selectedYear = allMonths.current[monthsSelected].substring(0, 4);
            const selectedMonth = allMonths.current[monthsSelected].substring(5, 7);
            const firstDay = new Date(selectedYear, selectedMonth - 1, 1).getDay();
            const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
            let daysarray = new Array();
            console.log(selectedYear)
            console.log(selectedMonth)
            console.log(firstDay)
            console.log(daysInMonth)

            for (let i = 0; i < firstDay; i++) {
                daysarray.push('blank')
            }
            for (let i = 1; i <= daysInMonth; i++) {
                daysarray.push(selectedYear + '/' + selectedMonth + '/' + i)
            }
            while (daysarray.length < 42) {
                daysarray.push('blank')
            }

            setDaysArray(daysarray);
        }
    }, [monthsSelected])

    return (
        <div>
            {typeof monthsSelected === 'number' ?
                <div className="calender display-flex">
                    <div className="calendar-top display-flex">
                        <a className="arrow" href="/#" onClick={prevMonth}></a>
                        <ul className="month-list display-flex">
                            {allMonths.current
                                // set three months for showing
                                .slice(monthsSelected < 1 ? 0 : monthsSelected === allMonths.current.length - 1 ? monthsSelected - 2 : monthsSelected - 1,
                                    monthsSelected < 1 ? monthsSelected + 3 : monthsSelected + 2)
                                .map((ele, i) => {
                                    return <li key={i} className={ele} onClick={selectMonth}>
                                        <a href="/#" className={allMonths.current[monthsSelected] === ele ? 'selected' : ''}>{ele.replace('/', ' ')}月</a>
                                    </li>
                                })}
                        </ul>
                        <a className="arrow arrow-right" href="/#" onClick={nextMonth}></a>
                    </div>
                    <ul className="weekdays display-flex">
                        {weekdays.map((ele, i) => { return <li key={i} className="weekday">{ele}</li> })}
                    </ul>
                    <div className="month-days">
                        {productsThisMonth}
                    </div>
                </div>
                : ''}

        </div>
    )
}
export default Calendar;