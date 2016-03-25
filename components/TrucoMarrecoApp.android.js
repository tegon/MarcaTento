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
import UserList from './UserList';

export default class TrucoMarrecoApp extends Component {
  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{ component: SignIn }}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={RouteMapper}
      />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
