import { DatePicker } from 'antd';
import React from 'react';
import './App.scss';

function App() {
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <div className="app">
            <h1>Web personal</h1>
            <DatePicker onChange={onChange} />
        </div>
    );
}

export default App;
