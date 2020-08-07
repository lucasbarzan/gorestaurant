import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
