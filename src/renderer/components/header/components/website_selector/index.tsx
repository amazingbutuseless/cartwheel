import * as React from 'react';

import CustomSelector from '../../../custom_selector';

import './style.scss';

export const WebsiteSelector = ({ onWebsiteSelect }) => {
    const registeredWebSites: object[] = [
        {
            key: '[ORC] local',
            value: 'https://local.oxfordreadingclub.com',
        }
    ];

    return (
        <div id="registered-website">
            <CustomSelector
                name="web-site-list"
                options={ registeredWebSites }
                onOptionChange={ onWebsiteSelect }
            ></CustomSelector>
        </div>
    );
};
