import React, {
  BackAndroid
} from 'react-native';

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
  return(<route.component navigator={navigationOperations} {...route.passProps} />);
};

export default RouteMapper;
