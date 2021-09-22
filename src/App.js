import React, { useState } from 'react';
import './App.css';
import 'react-credit-cards/es/styles-compiled.css';
// Material-UI imports
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import AddBoxIcon from '@material-ui/icons/AddBox';

// Custom Components
import FormsDialog from './components/forms-dialog';
import useLocalStorage from './utils/useLocalStorage';
import BannedCountriesForm from './components/Forms/banned-countries-form';
import CardForm from './components/validate-card-form';
import SavedCards from './components/Lists/saved-cards-list';
import BannedCountriesList from './components/Lists/banned-countries-list';

function App() {
  const [dialogProps, setDialogProps] = useState({
    isOpen: false,
  });
  const [savedcards, setSavedcards] = useLocalStorage('savedCards', {});
  const [bannedCountries, setBannedCountries] = useLocalStorage('bannedCountries', []);

  const clearSavedData = () => {
    setSavedcards({});
    setBannedCountries([]);
  }

  const handleCardSave = (cards) => {
    setSavedcards(cards);
    handleClose();
  }
  const handleCountriesSave = (countries) => {
    setBannedCountries(countries);
    handleClose();
  }
  const handleDialogOpen = (dialogForm) => {
    if (dialogForm === 'cardForm') {
      setDialogProps({
        title: "Validate Card Form",
        children: <CardForm savedCards={savedcards} handleSave={handleCardSave} />,
        isOpen: true,
        handleClose: handleClose
      })
    }
    if (dialogForm === 'configForm') {
      setDialogProps({
        title: "Configure Banned Countries",
        children: <BannedCountriesForm bannedCountries={bannedCountries} handleSave={handleCountriesSave} />,
        isOpen: true,
        handleClose: handleClose
      })
    }
    return true;
  }
  const handleClose = () => {
    setDialogProps({ isOpen: false });
  }
  return (
    <div className="app-root">
      <AppBar className="app-header" >
        <Toolbar className='app-title'  >
          <h1>Rank Interactive Assignment</h1>
          <Button
            className='clear-data-button'
            variant='outlined'
            onClick={clearSavedData} >
            Clear Data
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />

      <div className='content-root'>

        <div className='banned-countries-list'>
          <h2>
            Banned Countries
            <IconButton onClick={() => handleDialogOpen('configForm')} color='primary' >
              <AddBoxIcon />
            </IconButton>
          </h2>
          <BannedCountriesList countries={bannedCountries} />
        </div>

        <div className='card-list-root'>
          <h2>
            Validated Cards
            <IconButton onClick={() => handleDialogOpen('cardForm')} color='primary' >
              <AddBoxIcon />
            </IconButton>
          </h2>

          <SavedCards cards={savedcards} />
        </div>

        <FormsDialog {...dialogProps} />

      </div>

      <footer className='footer' >
        <p>made by: Ashleigh Davidson</p>
      </footer>
    </div>
  );
}

export default App;
