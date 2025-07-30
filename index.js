/**
 * @format
 */

import { AppRegistry } from 'react-native';
import Router from './src/Router';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import { store } from './src/state/store';
import { Provider } from 'react-redux';

const App = () => (
    <Provider store={store}>
        <PaperProvider>
            <Router />
        </PaperProvider>
    </Provider>
);

AppRegistry.registerComponent(appName, () => App);
