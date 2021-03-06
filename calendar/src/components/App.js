import React from 'react';
import Calendar from './Calendar';

class App extends React.Component {
    prevMonth = () => {
        this.calendarRef.current.prevMonth();
    }
    nextMonth = () => {
        this.calendarRef.current.nextMonth();
    }
    switch = () => {
        this.calendarRef.current.switch();
    }
    calendarRef = React.createRef();
    render() {
        return (
            <Calendar
                ref={this.calendarRef}
                dataSource={'./data2.json'}
                // initYearMonth={'201611'}
                initYearMonth={'201705'}
                dataKeySetting={{
                    'guaranteed': 'certain',
                    // 狀態
                    'status': 'state',
                    // 可賣團位
                    'available': 'onsell',
                    // 團位
                    'total': 'total',
                    // 價格
                    'price': 'price'
                }}
                onClickPrev={function ($btn, data) {
                    console.log($btn, data);
                }}
                onClickNext={function ($btn, data) {
                    console.log($btn, data);
                }}
                onClickDate={function ($date, data) {
                    console.log($date, data);
                }}
            />
        )
    }
}
export default App;