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
  if (route.name === 'SignIn') {
    return(<SignIn navigator={navigationOperations} />);
  }
};

export default class TrucoMarrecoApp extends Component {
  render() {
    var initialRoute = {name: 'SignIn'};

    return (
      <Navigator
        style={styles.container}
        initialRoute={initialRoute}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={RouteMapper}
      />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC107'
  }
});
