import React from 'react';
import Routes from './src/navigation/Routes';
import {OptionsProvider} from './src/providers/OptionsProvider';
import Toast from 'react-native-toast-message';

function App(): React.JSX.Element {
  return (
    <OptionsProvider>
      <Routes />
      <Toast />
    </OptionsProvider>
  );
}

export default App;
