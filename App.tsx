import React from 'react';
import Routes from './src/navigation/Routes';
import {OptionsProvider} from './src/providers/OptionsProvider';

function App(): React.JSX.Element {
  return (
    <OptionsProvider>
      <Routes />
    </OptionsProvider>
  );
}

export default App;
