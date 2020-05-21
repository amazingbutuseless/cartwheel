import * as path from 'path';
import * as React from 'react';

import CustomSelector from '../custom_selector';

import './style.scss';

class WebSiteSelector extends CustomSelector {
}

export default () => {
    const registeredWebSites: object[] = [
        {
            key: '[ORC] local',
            value: 'https://local.oxfordreadingclub.com',
        }
    ];

    return (
        <header>
            <h1>Cartwheel</h1>

            <WebSiteSelector name="website-list" options={ registeredWebSites } />

            <img src={ path.join(__static, "/settings-black-18dp.svg") } alt=""/>
        </header>
    );
};
