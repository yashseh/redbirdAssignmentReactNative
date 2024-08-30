import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Navigator from '@navigation/navigator';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store from '@state/store';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <View style={styles.container}>
      <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
          <NavigationContainer>
            <Navigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
