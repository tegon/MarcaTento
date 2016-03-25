import React, {
  View,
  Text,
  NavigatorIOS,
  Platform,
  StyleSheet,
  Component
} from 'react-native';

import SignIn from './SignIn';

export default class TrucoMarrecoApp extends Component {
  render() {
    return(
      <NavigatorIOS
        style={styles.container}
        navigationBarHidden={true}
        initialRoute={{title: 'Truco, marreco!', component: SignIn}} />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC107'
  }
});
