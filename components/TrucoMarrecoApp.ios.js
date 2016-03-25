import React, {
  View,
  Text,
  NavigatorIOS,
  Platform,
  StyleSheet,
  Component
} from 'react-native';

import SignIn from './SignIn';
import baseStyles from '../baseStyles';

export default class TrucoMarrecoApp extends Component {
  render() {
    return(
      <NavigatorIOS
        style={baseStyles.container}
        navigationBarHidden={true}
        initialRoute={{title: 'Truco, marreco!', component: SignIn}} />
    );
  }
}
