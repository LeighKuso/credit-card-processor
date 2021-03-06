import React, { useState, useMemo } from 'react';
import countryList from 'react-select-country-list';
import Card from 'react-credit-cards';
// Material-UI Components
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
// Custom Imports
import validateInfo from '../../utils/validateInfo';

export default function CardForm({ savedCards, handleSave }) {
    const [values, setValues] = useState({
        cardCountry: '',
        cardName: '',
        cardNumber: '',
        cardExpiry: '',
        cardCVC: '',
        focus: ''
    });
    const [errors, setErrors] = useState({});
    const options = useMemo(() => countryList().getData(), []);

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
        return;
    }

    const handleFocus = e => {
        setValues({
            ...values,
            focus: e.target.id
        });
        return;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        //Run card validation
        const _errors = await validateInfo(values);

        if (_errors.status !== 'success') {
            // display errors
            setErrors(_errors);
            return;
        } else {
            // update details if Valid and card is not saved
            if (savedCards[values.cardNumber]) {
                setErrors({
                    status: 'error',
                    message: 'This card already exists.'
                });
                return;
            }
            setErrors({});
            handleSave({ ...savedCards, [values.cardNumber]: values });
        }
    }

    return (
        <div className='card-form-root'>
            <div className='card-details' >
                <Card
                    number={values.cardNumber}
                    name={values.cardName}
                    expiry={values.cardExpiry}
                    cvc={values.cardCVC}
                    focused={values.focus}
                />

                <form onSubmit={handleSubmit} className='card-form' >
                    <FormControl className='card-form-control' >
                        <InputLabel id='country-select'>Select Country</InputLabel>
                        <Select
                            name='cardCountry'
                            labelid='country-select'
                            value={values.cardCountry}
                            onChange={handleChange}
                            required >
                            <MenuItem value='' >Select Country</MenuItem>
                            {options.map(item => (
                                <MenuItem key={item.value} value={item.label} >
                                    {item.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl className='card-form-control' >
                        <InputLabel id='cardName-input'>Name</InputLabel>
                        <Input
                            id='name'
                            type='text'
                            name='cardName'
                            labelid='cardName-input'
                            value={values.cardName}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            required
                        />
                    </FormControl>

                    <FormControl className='card-form-control' >
                        <InputLabel id='cardNumber-input'>Card Number</InputLabel>
                        <Input
                            id='number'
                            type='tel'
                            name='cardNumber'
                            labelid='cardNumber-input'
                            value={values.cardNumber}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            required
                        />
                    </FormControl>

                    <FormControl className='card-form-control' >
                        <InputLabel id='cardExpiry-input'>MM/YY Expiry</InputLabel>
                        <Input
                            id='expiry'
                            type='tel'
                            name='cardExpiry'
                            labelid='cardExpiry-input'
                            value={values.cardExpiry}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            required
                        />
                    </FormControl>

                    <FormControl className='card-form-control' >
                        <InputLabel id='cardCVC-input'>CVC</InputLabel>
                        <Input
                            id='cvc'
                            type='tel'
                            name='cardCVC'
                            labelid='cardCVC-input'
                            value={values.cardCVC}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            required
                        />
                    </FormControl>

                    <Button type='submit' variant='contained' className='submit-button' >
                        Submit
                    </Button>

                </form>

            </div>
            {errors.status !== 'error' ? (null) : (<p>{errors.message}</p>)}

        </div>
    )
}
