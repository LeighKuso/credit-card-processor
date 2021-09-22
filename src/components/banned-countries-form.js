import React, { useState, useMemo } from 'react';
// import Select from 'react-select';
import countryList from 'react-select-country-list'
// Material-ui Imports
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


export default function BannedCountriesForm({ bannedCountries, handleSave }) {
    const [value, setValue] = useState(bannedCountries);
    const options = useMemo(() => countryList().getData(), []);

    const handleChange = e => {
        setValue(e.target.value)
    }

    const handleSubmit = () => {
        handleSave(value);
    }

    return (
        <div className='country-form-root'>
            <Select
                id='country-multi-select'
                className='country-select'
                multiple
                value={value}
                onChange={handleChange}
                input={<Input />}
                renderValue={(selected) => (
                    <div className='country-select-chips'>
                        {selected.map((value) => (
                            <Chip key={value} label={value} className='country-chip' />
                        ))}
                    </div>
                )}
            >
                {options.map(item => (
                    <MenuItem key={item.value} value={item.label} >
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
            <Button
                variant='contained'
                onClick={handleSubmit}
                className='submit-button'>
                Submit
            </Button>
        </div>
    )
}