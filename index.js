/**
 * @format
 */

import { AppRegistry } from 'react-native';
import Router from './src/Router';
import { name as appName } from './app.json';
import { store } from './src/state/store';
import { Provider } from 'react-redux';

const App = () => (
    <Provider store={store}>
        <Router />
    </Provider>
);

AppRegistry.registerComponent(appName, () => App);
