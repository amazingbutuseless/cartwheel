import * as React from 'react';

import './style.scss';

interface KeyValueObject {
    key: string,
    value: any,
}

interface CustomSelectorProps {
    name: string,
    options: object[] | string[],
    onOptionChange?: Function,
}

export default class extends React.Component {
    constructor(public props: CustomSelectorProps) {
        super(props);

        if (props.onOptionChange) this.onOptionChange = props.onOptionChange;
    }

    onOptionChange(e: Event) {
        console.log(e.target.value);
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
                <select name={ name } onChange={ this.onOptionChange }>
                    { this.getOptions() }
                </select>
            </div>
        )
    }
}
