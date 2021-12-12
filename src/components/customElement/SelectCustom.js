import React from 'react';
import Select from 'react-select';
import styles from './SelectCustom.module.css'

export default ({ onChange, options, value }) => {

    const defaultValue = (options, value) => {
        return options ? options.find(option => option.value === value) : "";
    };

    return (
        <div className={styles.selectCustom}>
            <Select
                value={defaultValue(options, value)}
                onChange={value => {
                    onChange(value)
                }} options={options} />
        </div>
    )
}