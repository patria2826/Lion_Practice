import React, { Component } from 'react';
import axios from 'axios';
import './css/app.css';

class App extends Component {
    state = {
        completeData: [],
        monthsShowed: [],
        selectedMonth: null
    }
    weekdays = [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
    ]
    allMonths = [];
    getData = async () => {
        const response = await axios.get('./data1.json', {
            headers: {
                'Accept': 'application/json'
            }
        });
        this.setState({ completeData: response.data });

        // get year and month from data
        this.allMonths = Array.from(new Set(response.data.map((data) => { return data['date'].substring(0, 7) }))).sort();
        this.setState({ monthsShowed: this.allMonths.slice(0, 3) }, () => { this.setState({ selectedMonth: this.state.monthsShowed[0] }) }); //not sure

    }
    getDays = () => {
        
    }
    componentDidMount() {
        this.getData();
    }
    render() {
        return (
            <div className="calender display-flex">
                <div className="calendar-top display-flex">
                    <a className="arrow" href="#"></a>
                    <ul className="month-list display-flex">
                        {this.state.monthsShowed.map((ele, i) => { return <li key={i}><a href="#">{ele.replace('/', ' ')}月</a></li> })}
                    </ul>
                    <a className="arrow arrow-right" href="#"></a>
                </div>
                <ul className="weekdays display-flex">
                    {this.weekdays.map((ele, i) => { return <li key={i}>{ele}</li> })}
                </ul>
                <div className="month-days">
                </div>
            </div>
        )
    }
}
export default App;