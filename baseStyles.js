import React, {
  StyleSheet,
  Platform
} from 'react-native';

var fontFamily = Platform.OS === 'ios' ? 'Trebuchet MS' : 'Roboto';
var buttonHeight = Platform.OS === 'ios' ? 36 : 50;
var baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: fontFamily
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'normal'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#FFC107',
    borderColor: '#FFCA28',
    borderWidth: 1,
    borderRadius: 2,
    height: buttonHeight,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default baseStyles;
