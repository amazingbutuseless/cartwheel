import * as React from 'react';

import './style.scss';

import { WebsiteSelector } from './components/website_selector';

export default () => {
    const onWebsiteSelect = (e: Event) => {
        console.log(`${ e.target.value } selected!`);
    };

    return (
        <header>
            <h1>Cartwheel</h1>

            <WebsiteSelector onWebsiteSelect={ onWebsiteSelect }></WebsiteSelector>
        </header>
    );
};
