import React, {
  View,
  Text,
  Navigator,
  Platform,
  StyleSheet,
  Component,
  ToolbarAndroid,
  BackAndroid
} from 'react-native';

import RouteMapper from '../RouteMapper';
import SignIn from './SignIn';
import baseStyles from '../baseStyles';

export default class TrucoMarrecoApp extends Component {
  render() {
    return (
      <Navigator
        style={baseStyles.container}
        initialRoute={{ component: SignIn }}
        configureScene={() => Navigator.SceneConfigs.PushFromRight}
        renderScene={RouteMapper}
      />
    );
  }
}
