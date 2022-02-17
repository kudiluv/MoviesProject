import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigation from './src/routing/RootNavigator';
import {UserContexProvider} from './src/store/user.context';
import 'react-native-gesture-handler';

function App() {
  return (
    <SafeAreaProvider>
      <UserContexProvider>
        <RootNavigation />
      </UserContexProvider>
    </SafeAreaProvider>
  );
}

export default App;
