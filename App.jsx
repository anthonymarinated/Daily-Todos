import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import InputTodo from './components/inputTodo';
import ListTodo from './components/listTodo';

const App = () => {
    return (
        <div className='container'>
            <InputTodo/>
            <ListTodo/>
        </div>
    )
}

export default App;