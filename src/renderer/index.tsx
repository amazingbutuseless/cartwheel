import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Header from './components/header';
import Website from './components/website';

ReactDOM.render(
    <>
        <Header></Header>
        <Website></Website>
    </>,
    document.querySelector('#app')
);
