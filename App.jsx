import React, { useEffect, useState } from 'react';
import InputTodo from './components/inputTodo';
import ListTodo from './components/listTodo';
import './src/styles.css';
// import './src/style.scss';

const App = () => {
    return (
        <div className='container'>
            <InputTodo/>
            <ListTodo/>
            <h3 class="coding">Dont forget to submit some applications!</h3>
            <br/>
            <h2 class="mojo">Walk Mojo too!</h2>
        </div>
    )
}

export default App;