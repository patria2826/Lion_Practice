import React from 'react';
import Calendar from './Calendar';

const App = () => {

    return (
        <div>
            <Calendar
                dataSource={'./data3.json'}
                // initYearMonth={'201611'}
                initYearMonth={'201705'}
                dataKeySetting={{
                    'guaranteed': 'guaranteed',
                    // 狀態
                    'status': 'status',
                    // 可賣團位
                    'available': 'availableVancancy',
                    // 團位
                    'total': 'totalVacnacy',
                    // 價格
                    'price': 'price'
                }}
                onClickPrev={function ($btn, data, module) {
                    console.log($btn, data, module);
                }}
                onClickNext={function ($btn, data, module) {
                    console.log($btn, data, module);
                }}
                onClickDate={function ($date, data) {
                    console.log($date, data);
                }}
            />
        </div>
    )
    // }
}
export default App;