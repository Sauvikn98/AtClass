import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import RouterComponent from './src/RouterComponent';
import 'react-native-gesture-handler';
import { View, LogBox } from "react-native";
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <PersistGate persistor={persistor}>
    <Provider store={store}>
      <RouterComponent/>
    </Provider>
    </PersistGate>
  );
};

export default App;