import React, { useState } from 'react';
import './css/table.css';

const Table = function (props) {
    // Set state and variants
    const [startDate, setStartDate] = useState('2018/12/30 (六)');
    const [endDate, setEndDate] = useState('2019/01/02 (二)');
    // const [startDate, setStartDate] = useState(0);
    // const [endDate, setEndDate] = useState(0);
    const [scrolled, setScrolled] = useState(0);
    const [leftArrowClassName, setLeftArrowClassName] = useState('left-arrow display-none');
    const [rightArrowClassName, setRigthArrowClassName] = useState('right-arrow');
    const { tripData, count, speed, whenClick } = props;
    let colCount = 7;
    let titleClassName = 'display-flex flex-center flex-col';
    let titleTopClassName = titleClassName + ' top-cell';
    let infoClassName = 'display-flex flex-center';
    let cellClassName = 'cellInfo display-flex flex-center';

    // Components for render
    let tripStart = tripData ? tripData['data'].map((ele, i) => {
        return <div key={i} className={titleClassName}>
            {ele['date'].substring(5, 10) === "01/01" ? <span className="newYear">{ele['date'].substring(0, 4)}</span> : ''}
            <span>{ele['date'].substring(5, ele['date'].length)}</span>
        </div>;
    }) : '';
    let tripEnd = tripData ? tripData['data'].map((ele, i) => {
        return <div key={i} className={titleTopClassName}>{ele['data'][i]['date_tripEnd'].substring(5, 10) === "01/01" ?
            <span className="newYear">{ele['data'][i]['date_tripEnd'].substring(0, 4)}</span> : ''}
            <span>{ele['data'][i]['date_tripEnd'].substring(5, ele['data'][i]['date_tripEnd'].length)}</span>
        </div>;
    }) : '';
    let columnData = tripData ? tripData['data'].map((ele, i) => {
        let row = Object.values(ele['data']); //obj to arr

        return <div key={i} className={startDate === ele['date'] ? infoClassName + ' crossed' : infoClassName} onClick={() => { setStartDate(ele['date']) }}>
            {row.map((element, index) => {
                return <div key={index}
                    className={endDate === element.date_tripEnd ? (startDate === element.date_tripStart ? cellClassName + ' crossed selected' : cellClassName + ' crossed') : cellClassName}
                    onClick={(e) => { setEndDate(element.date_tripEnd); whenClick(e) }}>
                    {element.isTheCheapest && typeof element.price === 'number' ? <div><div className="cheapestTriangle"></div><div className="cheapest">最便宜</div></div> : ''}
                    <span className="price">{typeof element.price === 'number' ? '$' + element.price.toLocaleString() : element.price}</span>
                    {typeof element.price === 'number' ? '起' : ''}
                </div>
            })}
        </div>
    }) : '';

    // Life cycle
    React.useEffect(() => {
        if (count.show + scrolled >= colCount) {
            setScrolled(7 - count.show);
        }
        if (!scrolled) {
            setLeftArrowClassName('left-arrow display-none');
            setRigthArrowClassName('right-arrow');
        } else {
            if (scrolled + count.show >= colCount) setRigthArrowClassName('right-arrow display-none');
            else setRigthArrowClassName('right-arrow');
        }
    }, [scrolled, count.show, colCount])

    // Render
    return (
        <div className="display-flex width-inherit pos-relative">
            <div className={leftArrowClassName}
                onClick={scrolled ? () => setScrolled(scrolled - count.slide < 0 ? 0 : scrolled - count.slide) : () => { setRigthArrowClassName('right-arrow') }}>{'<'}</div>
            <div className={rightArrowClassName}
                onClick={() => {
                    if (scrolled + count.show <= colCount) {
                        setScrolled(scrolled + count.slide);
                        setLeftArrowClassName('left-arrow');
                    }
                }}>></div>
            <div className="table-left">
                <div className="title-left bg-top">
                    <div className="title-padding">
                        <p className="text-right">回程</p>
                        <p>去程</p>
                    </div>
                </div>
                <div className="title-left bg-left"><div className="display-flex flex-col flex-center">{tripStart}</div></div>
            </div>
            <div className={"table-right show-" + count.show}>
                <div className={"scrolled-" + scrolled} style={{ 'transition': speed + 's' }}>
                    <div className="display-flex flex-center title-top bg-top">{tripEnd}</div>
                    <div className="infoSection">{columnData}</div>
                </div>
            </div>
        </div>
    )
}

Table.defaultProps = {
    count: { slide: 1, show: 3 },
    speed: 0.3,
    whenClick: (element) => { console.log(element) }
}

export default Table;