import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import './css/Calendar.css';

const Calendar = (props) => {
    // set state and get props
    const [completeData, setCompleteData] = useState(0);
    const [monthsSelected, setMonthsSelected] = useState(undefined);
    const [daysArray, setDaysArray] = useState([]);
    const [mode, setMode] = useState('dayMode');
    const [cellSelected, setCellSelected] = useState(0);
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
    let monthsInData = useRef();

    // component for showing
    let productsThisMonth = daysArray.map((ele, i) => {
        const data = completeData.filter((product) => { return product['date'] === ele });
        const count = data.length;
        const day = new Date(ele).getDay().toString();
        return <div key={i}
            className={ele === 'blank' ? ele + ' days' : count ? ele === cellSelected ? 'days selected' : 'days' : 'days no-event'}
            onClick={(e) => { onClickDate(e['currentTarget'], e['currentTarget'].innerHTML) }}>
            {ele === 'blank' ? '' :
                <div className="days-this-month" onClick={() => { setCellSelected(ele); }}>
                    <div className="datum">
                        <span className="date">{parseInt(ele.substring(8, 10))}</span>
                        <span className="whichWeekDay">{weekdays[day]}</span>
                    </div>
                    {(() => {
                        if (count) {
                            if (count > 1) {
                                for (let i = 0; i < count; i++) {
                                    if (data[i + 1] && data[i][dataKeySetting['price']] > data[i + 1][dataKeySetting['price']]) {
                                        let temp = data[i];
                                        data[i] = data[i + 1];
                                        data[i + 1] = temp;
                                    }
                                }
                                return <span className="more">
                                    <span className="text">看更多團</span>
                                    <span><span className="price">${data[0][dataKeySetting['price']].toLocaleString()}</span>起</span>
                                </span>;
                            } else {
                                return (
                                    <div className="info">
                                        {data[0][dataKeySetting['guaranteed']] ?
                                            <span className="guaranteed guaranteed-y">成團</span> : <span className="guaranteed"></span>
                                        }
                                        <span className={(() => {
                                            switch (data[0][dataKeySetting['status']]) {
                                                case '預定':
                                                    return 'status pre-order';
                                                case '報名':
                                                    return 'status sign-up';
                                                case '後補':
                                                    return 'status waiting';
                                                case '額滿':
                                                    return 'status full';
                                                case '截止':
                                                    return 'status close';
                                                default:
                                            }
                                        })()}>{data[0][dataKeySetting['status']]}</span>
                                        <span className="available">可賣：{data[0][dataKeySetting['available']]}</span>
                                        <span className="total">團位：{data[0][dataKeySetting['total']]}</span>
                                        <span className="price">${data[0][dataKeySetting['price']].toLocaleString()}</span>
                                    </div>
                                );
                            }
                        } else if (!count) {
                            return;
                        }
                    })()}
                </div>
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

    const switchMode = () => {
        if (mode === 'dayMode') {
            setMode('listMode');
        } else {
            setMode('dayMode');
        }
    }

    const selectMonth = function (e) {
        const originallySelectedMonth = monthsSelected;
        const clickedMonthIndex = allMonths.current.indexOf(e.currentTarget.id);
        if (originallySelectedMonth > clickedMonthIndex) {
            onClickPrev(e['target'],
                completeData.filter((data) => {
                    if (data['date'].substring(0, 7) === allMonths.current[clickedMonthIndex]) { return data } else return []
                })
            );
        } else if (originallySelectedMonth < clickedMonthIndex) {
            onClickNext(e['target'],
                completeData.filter((data) => {
                    if (data['date'].substring(0, 7) === allMonths.current[originallySelectedMonth]) { return data } else return []
                })
            );
        }
        setMonthsSelected(clickedMonthIndex);
    }

    const prevMonth = function (e) {
        const clickedMonthIndex = allMonths.current.indexOf(e.currentTarget.className);
        if (monthsSelected >= 1) {
            onClickPrev(e['target'],
                completeData.filter((data) => {
                    if (data['date'].substring(0, 7) === allMonths.current[clickedMonthIndex]) { return data } else return []
                })
            );
            setMonthsSelected(monthsSelected - 1);
        }
    }

    const nextMonth = function (e) {
        const originallySelectedMonth = monthsSelected;
        onClickNext(e['target'],
            completeData.filter((data) => {
                if (data['date'].substring(0, 7) === allMonths.current[originallySelectedMonth]) { return data } else return []
            })
        )
        if (monthsSelected < allMonths.current.length - 1) {
            setMonthsSelected(monthsSelected + 1);
        }
    }

    // Life cycle
    useEffect(() => {
        if (!completeData) { getData() }
    }, [completeData, getData]);

    // set up one array storing years and months, another for years and months from data
    useEffect(() => {
        if (completeData) {
            allMonths.current = [];
            monthsInData.current = [];
            for (let i = 0; i < 50; i++) {
                const yyyymm = new Date('2016/01/01')
                let yyyy, mm;
                yyyymm.setMonth(i);
                if (i > 0 && i % 11 === 0) {
                    yyyymm.setUTCFullYear(yyyymm.getFullYear());
                }
                yyyy = yyyymm.getFullYear();
                mm = (yyyymm.getMonth() + 1 < 10 ? 0 : '') + (yyyymm.getMonth() + 1).toString();
                allMonths.current.push(yyyy + '/' + mm)
            }
            monthsInData.current = Array.from(
                new Set(completeData.map((data) => { return data['date'].substring(0, 7) }))
            ).sort();
        }
    });

    // setup with selected month
    useEffect(() => {
        if (typeof monthsSelected != 'number' && allMonths.current) {
            allMonths.current.map((ele, i) => {
                if (ele.replace('/', '') === initYearMonth) { setMonthsSelected(i); } return i;
            });
        }
    });

    // show or change overall view according to selected month
    useEffect(() => {
        if (typeof monthsSelected === 'number') {
            // get days in a month
            const selectedYear = allMonths.current[monthsSelected].substring(0, 4);
            const selectedMonth = allMonths.current[monthsSelected].substring(5, 7);
            const firstDay = new Date(selectedYear, selectedMonth - 1, 1).getDay();
            const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
            const daysarray = [];

            for (let i = 0; i < firstDay; i++) {
                daysarray.push('blank')
            }
            for (let i = 1; i <= daysInMonth; i++) {
                let date = i < 10 ? '0' + i : i;  //need to keep the zero
                daysarray.push(selectedYear + '/' + selectedMonth + '/' + date)
            }
            while (daysarray.length < 42) {
                daysarray.push('blank')
            }

            setDaysArray(daysarray);
        }
    }, [monthsSelected]);

    return (
        <div>
            {typeof monthsSelected === 'number' ?
                <div className="calender display-flex">
                    <div className="switch " onClick={switchMode}>
                        {mode === 'dayMode' ?
                            <span><i className="fas fa-list"></i> 切換列表顯示</span> :
                            <span><i className="far fa-calendar-alt"></i> 切換月曆顯示</span>}
                    </div>
                    <div className="calendar-top display-flex">
                        <a className="arrow" href="/#" onClick={prevMonth}>{}</a>
                        <ul className="month-list display-flex">
                            {allMonths.current
                                // set three months for showing
                                .slice(monthsSelected < 1 ? 0 : monthsSelected === allMonths.current.length - 1 ? monthsSelected - 2 : monthsSelected - 1,
                                    monthsSelected < 1 ? monthsSelected + 3 : monthsSelected + 2)
                                .map((ele, i) => {
                                    return <li key={i} id={ele} onClick={selectMonth}>
                                        <a href="/#" className={allMonths.current[monthsSelected] === ele ? 'selected' : ''}>
                                            {ele.replace('/', ' ')}月
                                        </a>
                                        {monthsInData.current.indexOf(ele) === -1 ?
                                            <div className="no-data">無出發日</div> : ''
                                        }
                                    </li>
                                })}
                        </ul>
                        <a className="arrow arrow-right" href="/#" onClick={nextMonth}>{}</a>
                    </div>
                    <div className={mode}>
                        {mode === 'listMode' && monthsInData.current.indexOf(allMonths.current[monthsSelected]) === -1 ?
                            <div className="no-data">本月無出發行程</div> : ''
                        }
                        <ul className="weekdays display-flex">
                            {weekdays.map((ele, i) => { return <li key={i} className="weekday">{ele}</li> })}
                        </ul>
                        <div className="month-days display-flex">
                            {productsThisMonth}
                        </div>
                    </div>
                </div>
                : ''}
        </div>
    )
}

Calendar.defaultProps = {
    dataSource: './data1.json',
    initYearMonth: '201708',
    dataKeySetting: {
        'guaranteed': 'guaranteed',
        // 狀態
        'status': 'status',
        // 可賣團位
        'available': 'availableVancancy',
        // 團位
        'total': 'totalVacnacy',
        // 價格
        'price': 'price'
    },
    onClickPrev: {
        function($btn, data, module) {
            console.log($btn, data, module);
        }
    },
    onClickNext: {
        function($btn, data, module) {
            console.log($btn, data, module);
        }
    },
    onClickDate: {
        function($date, data) {
            console.log($date, data);
        }
    },
}
export default Calendar;