import React, { useEffect, useState } from 'react';
// Material-ui imports
import Chip from '@material-ui/core/Chip';

export default function BannedCountriesList({countries}) {
    const [countriesList, setCountriesList] = useState(countries || []);

    useEffect(() => {
        setCountriesList(countries);
        return () => {
            setCountriesList([]);
        }
    }, [countries]);
    return (
        <div className='country-select-chips'>
            {countriesList && countriesList.map(item => (
                <Chip key={item} label={item} className='country-chip' />
            ))}
        </div>
    )
}
