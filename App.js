import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './app/navigations/Navigator';
import store from '@easypeasy';
import {StoreProvider} from 'easy-peasy';

const App = () => {
  return (
    <StoreProvider store={store}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </StoreProvider>
  );
};

export default App;
