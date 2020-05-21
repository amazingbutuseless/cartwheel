import * as React from 'react';

import './style.scss';

interface KeyValueObject {
    key: string,
    value: any,
}

interface CustomSelectorProps {
    name: string,
    options: object[] | string[],
}

export default class extends React.Component {
    constructor(public props: CustomSelectorProps) {
        super(props);
    }

    getOptions() {
        return this.props.options.map((option: KeyValueObject | string) => {
            let key: string;
            let value: any;

            if (typeof option == 'object') {
                key = option.key;
                value = option.value;
                
            } else {
                key = option;
                value = option;
            }

            return (
                <option key={ value } value={ value }>{ key }</option>
            );
        });
    }

    render() {
        const { name } = this.props;

        return (
            <div className="selector-wrapper">
                <select name={ name }>{ this.getOptions() }</select>
            </div>
        )
    }
}
