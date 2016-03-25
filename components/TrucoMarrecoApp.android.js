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

import SignIn from './SignIn';
import UserList from './UserList';

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var RouteMapper = function(route, navigationOperations, onComponentRef) {
  _navigator = navigationOperations;
  return(<route.component navigator={navigationOperations} />);
};

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
